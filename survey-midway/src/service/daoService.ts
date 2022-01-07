import { Types } from 'mongoose';

export class DaoService {
  defaultSort;
  model;
  constructor() {
    this.defaultSort = { _id: -1 };
  }

  success(result?) {
    return {
      success: true,
      result,
    };
  }

  fail(message?) {
    return {
      success: false,
      message,
    };
  }

  async index(body, pagin?, selectFileds?) {
    return await this.findByPage(
      this.queryCriteria(body),
      pagin,
      selectFileds,
      this.sort(body)
    );
  }

  async show(_id, selectFileds?) {
    return await this.model.findOne({ _id }, selectFileds);
  }

  async update(_id, params) {
    params.updated = Date.now();
    const result = await this.model.findOneAndUpdate(
      { _id },
      { $set: params },
      { new: true }
    );
    return { _id: result._id };
  }

  async create(request) {
    if (!request) {
      return;
    }
    request._id = new Types.ObjectId();
    // console.log(`create ${JSON.stringify(request)}`);
    request.created = Date.now();
    const result = await this.model.create(request);
    return { _id: result._id };
  }

  async destroy(_id) {
    return await this.model.remove({ _id });
  }

  async count(query) {
    return await this.model.count(query);
  }

  async find(query, sort = this.defaultSort, selectFileds?) {
    return await this.model.find(query).select(selectFileds).sort(sort);
  }

  async findOne(query) {
    return await this.model.findOne(query);
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async findByPage(
    params,
    pagin: any = {},
    selectFileds,
    sort = this.defaultSort
  ) {
    const count = await this.count(params);
    const page = Number(pagin.page || 1);
    const pageSize = Number(pagin.pageSize || 10);
    const from = (page - 1) * pageSize;

    const content = await this.model
      .find(params)
      .skip(from)
      .limit(pageSize)
      .select(selectFileds)
      .sort(sort);

    const result = {
      count,
      page,
      pageSize,
      content,
    };
    return result;
  }

  queryCriteria(search) {
    const queries = {};
    if (!search || search === {}) {
      return queries;
    }
    if (search.eqs) {
      Object.assign(queries, search.eqs);
    }
    if (search.likes) {
      for (const [key, value] of Object.entries(search.likes)) {
        queries[key] = { $regex: value };
      }
    }

    if (search.ins) {
      for (const [key, value] of Object.entries(search.ins)) {
        queries[key] = { $in: value };
      }
    }

    if (search.times) {
      for (const [key, value] of Object.entries(search.times)) {
        const v: any = value;
        const start = v.start;
        const end = v.end;
        if (!queries[key] && (start || end)) {
          queries[key] = {};
        }
        if (start) {
          queries[key].$gte = start;
        }
        if (end) {
          queries[key].$lte = end;
        }
      }
    }
    return queries;
  }

  sort(search) {
    if (!search || search === {}) {
      return {};
    }
    let queries;
    if (search.sorts) {
      for (const [key, value] of Object.entries(search.sorts)) {
        if (!queries) {
          queries = {};
        }
        let sortValue = -1;
        switch (value) {
          case 'asc':
            sortValue = 1;
            break;
          case 'desc':
            sortValue = -1;
            break;
        }
        queries[key] = sortValue;
      }
    }
    return queries;
  }

  async findOneAndUpdateById(_id, updateFields) {
    const result = await this.model.findOneAndUpdate({ _id }, updateFields, {
      new: true,
    });
    return result ? this.success() : this.fail();
  }

  async findOneAndUpdate(query, updateFields) {
    const result = await this.model.findOneAndUpdate(query, updateFields, {
      new: true,
    });
    return result ? this.success() : this.fail();
  }

  async updateMulti(query, updateFields) {
    const result = await this.model.update(query, updateFields, {
      multi: true,
    });
    return result;
  }

  async remove(query) {
    return await this.model.remove(query);
  }
}
