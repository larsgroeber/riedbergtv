import { Config } from 'src/config';
import { Video } from 'src/models/video';
import { Category } from 'src/models/category';
import { Page } from 'src/models/page';
import { Text } from 'src/models/text';
import { toast } from 'react-toastify';
import { TeamMember } from 'src/models/member';

export class API {
  static buildURL(route: string) {
    return `${Config.apiBase}/${route}`;
  }

  static buildGetRequest(route: string) {
    return this.buildRequest(fetch(this.buildURL(route)), route);
  }

  static buildRequest(request: Promise<Response>, route: string) {
    return request
      .then(res => {
        if (!res.ok) {
          throw new Error('Response does not indicate success.');
        }
        return res.json();
      })
      .catch(error => {
        console.error('API Error:', error);
        this.showError(error, route);
        return [];
      });
  }

  static showError(error: any, route: string) {
    toast.error(
      `Ein Fehler ist aufgetreten als wir ${this.buildURL(
        route,
      )} aufrufen wollten.`,
      {
        autoClose: false,
      },
    );
  }

  static buildFindRequest(route: string, query?: any): Promise<any[]> {
    const url = new URL(this.buildURL(route));
    query = {
      ...query,
      _sort: 'createdAt:asc',
    };
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
    return this.buildRequest(fetch(url.toString()), route);
  }

  static getVideos(): Promise<Video[]> {
    return this.findVideos();
  }

  static findVideos(query?: any): Promise<Video[]> {
    return this.buildFindRequest('videos', query);
  }

  static getTexts(): Promise<Text[]> {
    return this.buildGetRequest('texts');
  }

  static getFaqs(): Promise<Text[]> {
    return this.buildGetRequest('faqs');
  }

  static getTeamMembers(): Promise<TeamMember[]> {
    return this.buildGetRequest('teammembers');
  }

  static getCategories(): Promise<Category[]> {
    return this.buildGetRequest('categories');
  }

  static getPages(): Promise<Page[]> {
    return this.buildGetRequest('pages');
  }

  static findPages(query?: any): Promise<Page[]> {
    return this.buildFindRequest('pages', query);
  }
}
