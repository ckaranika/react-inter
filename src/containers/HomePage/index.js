import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataView } from 'primereact/dataview';
import { getRepos, getUserData } from '../../utils/github-api';
import './homepage.css';

export default class HomePage extends Component {

  constructor() {
      super();
      this.state = {
          username: '',
          repos: [],
          orgs: [],
          layout: 'list'
      };
      this.repoTemplate = this.repoTemplate.bind(this);
      this.orgTemplate = this.orgTemplate.bind(this);
  }

  render() {
    return (
      <div class="page page-home">
        <section>
          <p>An UI web application that retrieves and displays the user repositories and organisations in Github.</p>
        </section>
        <section>
          <h2>Try me!</h2>
          <p>
            Show user repositories and organisations by @<InputText
              value={this.state.username}
              onChange={(e) => this.getData(e.target.value)}
              placeholder="username" />
          </p>
          <TabView>
              <TabPanel header="Repositories">
                <DataView
                  value={this.state.repos}
                  layout='list'
                  itemTemplate={this.repoTemplate}
                  paginator={this.state.repos && this.state.repos.length > 10}
                  paginatorPosition='both'
                  rows={10}>
                </DataView>
              </TabPanel>
              <TabPanel header="Organizations">
                <DataView
                value={this.state.orgs}
                layout='list'
                itemTemplate={this.orgTemplate}
                paginator={this.state.repos && this.state.repos.length > 10}
                paginatorPosition='both'
                rows={10}></DataView>
              </TabPanel>
          </TabView>
        </section>
      </div>
    );
  }

  repoTemplate(repo) {
    return (
        <div>{repo.name}</div>
    );
  }

  orgTemplate(org) {
    return (
        <div>
         <img alt="{org.login}" src={org.avatar_url}/>
         <span>{org.login}</span>
        </div>
    );
  }

  getData(username){
    this.setState({username: username});
    getRepos(username).then(data => {
      this.setState({repos: data});
    });
    getUserData(username).then(data => {
      this.setState({orgs: data.orgs});
    });
  }
}
