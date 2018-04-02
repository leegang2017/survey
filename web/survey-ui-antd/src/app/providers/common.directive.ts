import { Directive, ElementRef, ViewContainerRef, TemplateRef, EmbeddedViewRef, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../providers/common.service';


@Directive({
  selector: '[appNgThumb]'
})
export class NgThumbDirective {
  _file: any;
  constructor(private el: ElementRef) {
    this.showThumb();
  }

  @Input('appNgThumb')
  set file(name) {
    this._file = name;
    this.showThumb();
  }


  showThumb() {
    if (this._file) {
      const reader = new FileReader();
      reader.onload = (evt: any) => {
        this.el.nativeElement.src = evt.target.result;
      };
      reader.readAsDataURL(this._file);
    }
  }
}

@Directive({
  selector: '[var]',
  exportAs: 'var'
})
export class VarDirective {
  @Input() var:any;
}

@Directive({
  selector: '[permission]'
})
export class PermissionDirective {
  private _context: any = {};
  _permission: any;
  constructor(private _viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>, private auth: AuthService) {
    // this.show();
  }

  @Input('permission')
  set file(name) {
    this._permission = name;
    const loginUser = this.auth.getLoginUser();
    this._context.$implicit = loginUser.totalRoles.some(r => r === this._permission)
    this._updateView();
  }


  _updateView() {
    if (this._context.$implicit) {
      this._viewContainer.clear();
      this._viewContainer.createEmbeddedView(this.templateRef, this._context);
    }
  }
}

@Directive({
  selector: '[sortable]'
})
export class NgSortableDirective {
  _file: any;
  constructor(private el: ElementRef) {
  }

  @Output('myDrop') drop = new EventEmitter();

  @HostListener('dragover', ['$event']) onMousedragover(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
  }

  @HostListener('window:dragstart', ['$event']) onMousedragstart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  @HostListener('drop', ['$event']) onMousedrop(ev) {
    var dragId = ev.dataTransfer.getData("text");
    var dragEl = document.getElementById(dragId);
    var destEl = document.getElementById(ev.currentTarget.id);
    destEl.parentNode.insertBefore(dragEl, destEl);
    this.drop.next();
  }

}