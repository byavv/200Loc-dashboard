import { Component } from '@angular/core';

@Component({
    template: `
       
    <div class="l-cluster" flexy [bottom]='50'>
        <div class="l__page-header">
            <span class="title">Cluster</span>
        </div>
        <div class='l__page-body'>
            <div class="cluster">
                <h4>//TBD</h4>
                <router-outlet></router-outlet>   
            </div> 
        </div> 
    </div>  
     
    `
})
export class ClusterBaseComponent { }