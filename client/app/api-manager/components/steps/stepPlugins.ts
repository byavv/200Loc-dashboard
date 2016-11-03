import { Component, OnInit, Output, Input, EventEmitter, OnDestroy, Host, ViewChildren, QueryList, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ShowError } from '../../directives';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Config, Plugin } from '../../../core/models';
import { BackEnd, AppController } from '../../../shared/services';
import { MasterController } from '../../services/masterController';
import { Observable } from 'rxjs';

import { Subject } from 'rxjs';

@Component({
    selector: 'step-plugins',
    template: require("./templates/stepPlugins.html"),
    styles: [require('./styles/stepPlugins.scss'),
        `
     :host {
        flex:1;
        display: flex;
        flex-direction: column;
    }
    `]
})
export class StepPlugins implements OnInit {
    _apiConfig;
    @Output()
    next: EventEmitter<any> = new EventEmitter();
    activePlugin: Plugin;
    appliedPlugins: Array<Plugin> = [];
    // all plugins installed
    plugins: Array<Plugin> = [];
    loading: boolean;
    submitted: boolean = false;
    selectedPlugin: Plugin;
    showError: boolean = false;

    constructor(
        private master: MasterController,
        fb: FormBuilder,
        private backEnd: BackEnd,
        private appController: AppController) {
    }

    ngOnInit() {
        this.loading = true;
        this.master.error$.subscribe(() => {
            this.showError = true;
        });
        this.appController
            .init$
            .do((defaults) => { this.plugins = defaults.plugins || []; })
            .flatMap(() => this.master.init$)
            .subscribe((apiConfig) => {
                this.loading = false;

                for (let plugin of apiConfig.plugins) {
                    this.insertPlugin(plugin.name, {// value
                        settings: plugin.settings,
                        dependencies: plugin.dependencies
                    })
                }

                this.stagePlugins();
                this.applyValidation();
                this.selectPluginInPipe();
            });
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
        this._valid
            ? this.master.setValidity('plugins', true)
            : this.master.setValidity('plugins', false);
    }

    stagePlugins() {
        const plugins = this.appliedPlugins.map(p => {
            return {
                name: p.name,
                description: p.description,
                settings: p.value.settings,
                dependencies: p.value.dependencies
            }
        });
        this.master.config.plugins = plugins;
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

    onSubmit() {
        this.submitted = true;
        this.showError = true;
        this.master.setValidity('plugins', this.appliedPlugins.length > 0);
        if (this._valid) {
            this.stagePlugins();
            this.next.next('preview');
        }
    }
}