import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  RowAccessor,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { SPPermission } from '@microsoft/sp-page-context';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'MyExtensionCommandSetStrings';

import * as jQuery from 'jquery';
import './Ext/bootoast.css';
import './Ext/bootstrap.min.css';
var bootoast:any=require('./Ext/bootoast.js');
import { sp, PermissionKind,IBasePermissions } from "@pnp/sp/presets/all";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IMyExtensionCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'MyExtensionCommandSet';

export default class MyExtensionCommandSet extends BaseListViewCommandSet<IMyExtensionCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized MyExtensionCommandSet');
    
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    //debugger;
    
    if (compareOneCommand) {
      event.selectedRows.forEach((row: RowAccessor, index: number) => {
        let itemId=row.getValueByName('ID');
        let userName=this.context.pageContext.user.loginName;
        //('i:0%23.f|membership|'+userName,PermissionKind.EditListItems)
        let result= sp.web.lists.getByTitle("Pictures").items.getById(itemId).getCurrentUserEffectivePermissions();
        
        compareOneCommand.visible = false;
        alert(`Field ID: ${row.getValueByName('ID')} - Field title: ${row.getValueByName('Title')}`);
    });
      // This command should be hidden unless exactly one row is selected.
      
    }
    
    
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    //debugger;
    switch (event.itemId) {      
      case 'COMMAND_1':        
        
        //debugger;
        bootoast.toast({
          message: 'This is an info toast message',
          position:'right-top'
        });
        //console.log(this.context.pageContext.legacyPageContext);
        //var viewId=this.context.pageContext.legacyPageContext.viewId;        
        //Dialog.alert(viewId);
        break;
      case 'COMMAND_2':
      console.log(this.context.pageContext.legacyPageContext);
      Dialog.alert(`${this.properties.sampleTextTwo}`);
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
