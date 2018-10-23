/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EventEmitter } from 'events';
import TdLibController from '../Controllers/TdLibController';

class BasicGroupStore extends EventEmitter{
    constructor(){
        super();

        this.items = new Map();
        this.fullInfoItems = new Map();

        this.onUpdate = this.onUpdate.bind(this);
        TdLibController.on('tdlib_update', this.onUpdate);

        this.setMaxListeners(Infinity);
    }

    onUpdate(update){
        switch (update['@type']) {
            case 'updateBasicGroup':{
                this.set(update.basic_group);

                this.emit(update['@type'], update);
                break;
            }
            case 'updateBasicGroupFullInfo':
                this.setFullInfo(update.basic_group_id, update.basic_group_full_info);

                this.emit(update['@type'], update);
                break;
            default:
                break;
        }
    }

    get(groupId){
        return this.items.get(groupId);
    }

    set(group){
        this.items.set(group.id, group);
    }

    getFullInfo(id){
        return this.fullInfoItems.get(id);
    }

    setFullInfo(id, fullInfo){
        this.fullInfoItems.set(id, fullInfo);
    }
}

const store = new BasicGroupStore();

export default store;