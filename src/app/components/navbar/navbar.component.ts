import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { title } from 'process';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  tabs: any[];
  selected_path: string = '';

  @ViewChild('customTabTemplate', { static: true }) customTabTemplate: TemplateRef<any>;

  constructor(private router: Router, private route: ActivatedRoute, private title: Title) {
    this.tabs = [
      {
        id: 0,
        text: 'Home',
        path: 'home',
        customClass: '.nav-link', // Add custom class identifier.
      },
      {
        id: 1,
        text: 'Genome Browser',
        icon: 'verticalaligntop',
        path: 'igv',
      },
      {
        id: 2,
        text: 'Go Term Enrichment',
        icon: 'columnfield',
        path: 'go',
      },
      {
        id: 3,
        text: 'Search & Download',
        icon: 'find',
        path: 'search',
      },
      /* Delete documentation tab {
        id: 4,
        text: 'Documentation',
        icon: 'file',
        path: 'documentation',
      },*/
    ];
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.selected_path = event.urlAfterRedirects.split('/')[1];
      this.updateSelectedTab();
    });
    this.selected_path = this.router.url.split('/')[1];
    this.updateSelectedTab();

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        document.getElementById('darkModeSwitch')?.setAttribute('checked', 'checked');
        document.getElementById("darkModeBtn")!.innerHTML = "<i class=\"fa fa-moon\"><\/i>";
    }
    console.log(prefersDark);
  }

  selectTab(index: number) {
    const selectedTab = this.tabs[index];
    this.title.setTitle(selectedTab.text + " - MCareDB"); 
    this.router.navigate([selectedTab.path]);
  }

  updateSelectedTab() {
    const tabIndex = this.tabs.findIndex(tab => tab.path === this.selected_path);
    if (tabIndex !== -1) {
      setTimeout(() => {
        const tabElement = document.querySelectorAll('.dx-tab')[tabIndex] as HTMLElement;
        if (tabElement) {
          tabElement.click();
        }
      }, 0);
    }
  }

  onDarkModeSwitchClick() {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'light')
    }
    else {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    }
  }

  onDarkModeBtnClick() {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      document.getElementById("darkModeBtn")!.innerHTML = "<i class=\"fa fa-cloud-sun\"><\/i>";
    }
    else {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      document.getElementById("darkModeBtn")!.innerHTML = "<i class=\"fa fa-moon\"><\/i>";
    }
  }
}


