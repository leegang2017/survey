#!/bin/sh

dist ()
{
    cd /media/study/workspaces/workspace_angular/
    rm /media/study/workspaces/workspace_angular/survey-ui-antd.zip
    zip  -r /media/study/workspaces/workspace_angular/survey-ui-antd.zip survey-ui-antd -i "survey-ui-antd/dist/*"
}
uploadServer ()
{
    scp  /media/study/workspaces/workspace_angular/survey-ui-antd.zip  leegang@112.74.88.166:/data/programs/dev-run/survey/web
}

restart ()
{
    ssh leegang@112.74.88.166 'cd /data/programs/dev-run/survey/web/survey-ui-antd;;cd ../;unzip survey-ui-antd.zip;'
    echo "  will restart server"
    sleep 3
    ssh leegang@106.15.229.226 << EOF
    cd /data/programs/dev-run/survey/web/survey-ui-antd;
    nohup npm run start &
EOF
}

if [ "$1" = "apk" ] ; then
    uploadApk;
elif [ "$1" = "dist" ]; then
    dist;
elif [ "$1" = "uploadServer" ]; then
    uploadServer;
elif [ "$1" = "restart" ]; then
    #uploadServer;
    restart;
elif [ "$1" = "restartUI" ]; then
    uploadUi;
elif [ "$1" = "restartAll" ]; then
    dist;
    uploadServer;
    restart;
else
    echo "  dist                sbt dist"
    echo "  restart             upload server and restart"
    echo "  restartAll          combine   dist, restart"
    exit 1
fi