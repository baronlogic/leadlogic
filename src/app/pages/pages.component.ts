import { Component, OnInit } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(
    private router: Router,
    private _focusMonitor: FocusMonitor
  ) 
  { 
    this._focusMonitor.stopMonitoring(document.getElementById('btn'));
  }

  ngOnInit(): void {
    this._focusMonitor.stopMonitoring(document.getElementById('btn'));
  }

}
