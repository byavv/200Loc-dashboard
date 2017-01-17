import { Component, OnInit, AfterViewInit, Output, Input, EventEmitter, OnDestroy, Host, ViewChildren, QueryList, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ShowError } from '../../directives';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Config, Plugin } from '../../../core/models';
import { Observable, Subject, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState, getConfigState, getPlugins, getMasterConfigPlugins } from '../../../core/reducers';
import { MasterActions, ValidationActions } from '../../../core/actions';

@Component({
    selector: 'step-plugins',
    templateUrl: "./templates/stepPlugins.html",
    styleUrls: ['./styles/stepPlugins.scss']
})
export class StepPlugins implements AfterViewInit {
    _apiConfig;
    @Output()
    next: EventEmitter<any> = new EventEmitter();
    @Output()
    validation: EventEmitter<any> = new EventEmitter();

    activePlugin: Plugin;
    appliedPlugins: Array<Plugin> = [];
    // all plugins installed
    plugins: Array<Plugin> = [];
    loading: boolean;
    @Input()
    submitted: boolean = false;
    selectedPlugin: Plugin;
    showError: boolean = false;
    configStateSub_n: Subscription;
    pluginsSub_n: Subscription;
    constructor(
        private _masterActions: MasterActions,
        private _validationActions: ValidationActions,
        private _store: Store<AppState>) {
    }

    ngAfterViewInit() {
        this.loading = true;
        this.configStateSub_n = this._store.let(getConfigState())
            .subscribe((config) => {
                const plugins = [...config.plugins];
                console.log("PLUGINS", plugins)
                this.loading = false;
                if (plugins) {
                    this.appliedPlugins = [];
                    for (let plugin of plugins) {
                        if (plugin.value)
                            this.insertPlugin(plugin.name, {// value
                                settings: plugin.value.settings,
                                dependencies: plugin.value.dependencies
                            });
                    }
                    this.stagePlugins();
                    this.applyValidation();
                    this.selectPluginInPipe();
                }
            });

        // get default app available plugins 
        this.pluginsSub_n = this._store.let(getPlugins())
            .subscribe((plugins) => {
                this.plugins = plugins || [];
            });

    }
    ngOnDestroy() {
        if (this.configStateSub_n) {
            this.configStateSub_n.unsubscribe();
        }
        if (this.pluginsSub_n) {
            this.pluginsSub_n.unsubscribe();
        }
    }
    /**
     * Add new or configured plugin into list
     */
    addNewPlugin(plugin: Plugin, value: any = {}, apply: boolean = true) {
        this.insertPlugin(plugin.name, {});
        this.selectPluginInPipe(this.appliedPlugins[this.appliedPlugins.length - 1]);
        this.stagePlugins();
        this.applyValidation();
    }
    insertPlugin(pluginName, pluginValue = {}) {
        const plugin = this.plugins.find(plugin => plugin.name === pluginName);
        var plCp = Object.assign({}, plugin);
        let pluginInst = new Plugin(plCp, this._lastOrder + 1, pluginValue);
        this.appliedPlugins.push(pluginInst);
    }

    //# private mathods
    private get _valid(): boolean {
        let valid = true;
        if (this.appliedPlugins.length < 1) { return false; }
        for (let plugin of this.appliedPlugins) {
            if (!plugin.valid) {
                valid = false;
            }
        }
        return valid;
    }

    private get _lastOrder(): number {
        var lastOrder = 0;
        if (this.appliedPlugins.length > 0) {
            lastOrder = this.appliedPlugins
                .reduce((prev: Plugin, current: Plugin) => {
                    return prev.order < current.order ? current : prev;
                }).order;
        }
        return lastOrder;
    }

    private _sort() {
        this.appliedPlugins.sort((a, b) => {
            return a.order - b.order;
        });
    }

    applyValidation() {
        this._store.dispatch(this._validationActions.setValidity({ plugins: this._valid }));
        this.validation.emit(this._valid);
    }

    stagePlugins() {
        this._store.dispatch(this._masterActions.setPluginsData(this.appliedPlugins));
    }

    /*
     * --------------------------
     * Manage plugin pipe methods
     * --------------------------
     */

    /**
     * Select plugin, action that sets active plugin and show it's settings form
     * 
     * @param {Plugin} [plugin]
     * @returns
     * 
     * @memberOf StepPlugins
     */
    selectPluginInPipe(plugin?: Plugin) {
        this.appliedPlugins.forEach((p) => {
            p.active = false;
        })
        if (!plugin) {
            if (this.appliedPlugins.length > 0) {
                this.appliedPlugins[0].active = true;
                this.activePlugin = this.appliedPlugins[0];
            } else {
                return;
            }
        } else {
            plugin.active = true;
            this.activePlugin = plugin;
        }
    }

    pluginUp(plugin: Plugin) {
        this.selectPluginInPipe(plugin);
        if (!this.isLast(plugin)) {
            var next = this.appliedPlugins[this.appliedPlugins.indexOf(plugin) + 1];
            plugin.order++;
            next.order--;
            this._sort();
        }
        this.stagePlugins();
    }

    pluginDown(plugin: Plugin) {
        this.selectPluginInPipe(plugin);
        if (!this.isFirst(plugin)) {
            var prev = this.appliedPlugins[this.appliedPlugins.indexOf(plugin) - 1];
            plugin.order--;
            prev.order++;
            this._sort();
        }
        this.stagePlugins();
    }

    pluginDelete(plugin) {
        var index = this.appliedPlugins.indexOf(plugin);
        this.appliedPlugins.splice(index, 1);
        if (this.appliedPlugins[0])
            this.selectPluginInPipe();

        this.stagePlugins();
        this.applyValidation();
    }

    isLast(plugin): boolean {
        return (plugin === this.appliedPlugins
            .reduce((prev: Plugin, current: Plugin) => {
                return prev.order < current.order ? current : prev;
            }));
    }

    isFirst(plugin): boolean {
        return (plugin === this.appliedPlugins
            .reduce((prev: Plugin, current: Plugin) => {
                return prev.order > current.order ? current : prev;
            }));
    }

    /**
     * Plugin selection in modal window
     * 
     * @param {any} plugin
     * 
     * @memberOf StepPlugins
     */
    selectPlugin(plugin) {
        this.plugins.forEach(plugin => {
            plugin.active = false;
        })
        this.selectedPlugin = plugin;
        this.selectedPlugin.active = true;
    }
    pluginValueChanged(plugin, value) {
        const ind = this.appliedPlugins.indexOf(plugin);
        this.appliedPlugins[ind].value = value;
    }
    pluginValidationChanged(plugin, isValid) {
        const ind = this.appliedPlugins.indexOf(plugin);
        this.appliedPlugins[ind].valid = isValid;
        this.applyValidation();
        this.stagePlugins();       
    }

    onSubmit() {
        this.submitted = true;
        this.showError = true;
        this._store.dispatch(this._validationActions.setValidity({ plugins: this.appliedPlugins.length > 0 }))
        if (this._valid) {
            this.stagePlugins();
            this.next.next('preview');
        }
    }
}