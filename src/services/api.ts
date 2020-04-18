import { Notification } from "src/models/notification";
import { Config } from "src/config";
import { Video } from "src/models/video";
import { Category } from "src/models/category";
import { Page } from "src/models/page";
import { Text } from "src/models/text";
import { toast } from "react-toastify";
import { TeamMember } from "src/models/member";
import { EMailBody } from "src/models/email-body";
import * as Sentry from "@sentry/browser";

export class API {
  static buildURL(route: string, customBackend = false) {
    const apiBaseString = !customBackend
      ? Config.apiBase
      : Config.customBackend;
    return `${apiBaseString}/${route}`;
  }

  static buildGetRequest(route: string, customBackend = false) {
    return this.buildRequest(fetch(this.buildURL(route, customBackend)), route);
  }

  static buildPostRequest(route: string, body: any, customBackend = false) {
    return this.buildRequest(
      fetch(this.buildURL(route, customBackend), {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      route
    );
  }

  static buildPutRequest(route: string, body: any, customBackend = false) {
    return this.buildRequest(
      fetch(this.buildURL(route, customBackend), {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      route
    );
  }

  static buildRequest(request: Promise<Response>, route: string) {
    return request
      .then((res) => {
        if (!res.ok) {
          throw new Error("Response does not indicate success.");
        }
        return res.json();
      })
      .catch((error) => {
        console.error("API Error:", error);
        this.showError(error, route);
        return Promise.reject(error);
      });
  }

  static showError(error: any, route: string) {
    Sentry.withScope((scope) => {
      Object.keys(error).forEach((key) => {
        scope.setExtra(key, error[key]);
      });
      Sentry.captureException(error);
    });
    toast.error(
      `Ein Fehler ist aufgetreten als wir ${this.buildURL(
        route
      )} aufrufen wollten.`,
      {
        autoClose: false,
      }
    );
  }

  static buildFindRequest(route: string, query?: any): Promise<any[]> {
    const url = new URL(this.buildURL(route));
    query = {
      ...query,
      _sort: "createdAt:asc",
    };
    Object.keys(query).forEach((key) =>
      url.searchParams.append(key, query[key])
    );
    return this.buildRequest(fetch(url.toString()), route);
  }

  static getVideos(): Promise<Video[]> {
    return this.findVideos();
  }

  static findVideos(query?: any): Promise<Video[]> {
    return this.buildFindRequest("videos", query);
  }

  static findCategory(query?: any): Promise<Category[]> {
    return this.buildFindRequest("categories", query);
  }

  static getTexts(): Promise<Text[]> {
    return this.buildGetRequest("texts");
  }

  static getFaqs(): Promise<Text[]> {
    return this.buildGetRequest("faqs");
  }

  static getTeamMembers(): Promise<TeamMember[]> {
    return this.buildGetRequest("teammembers");
  }

  static getCategories(): Promise<Category[]> {
    return this.buildGetRequest("categories");
  }

  static getPages(): Promise<Page[]> {
    return this.buildGetRequest("pages");
  }

  static findPages(query?: any): Promise<Page[]> {
    return this.buildFindRequest("pages", query);
  }

  static sendEmail(body: EMailBody): Promise<any> {
    return this.buildPostRequest("email", body, true);
  }

  static getNotifications(): Promise<Notification[]> {
    return this.buildGetRequest("notifications");
  }

  static videoWatched(id: string): Promise<void> {
    return this.buildPutRequest(`videos/${id}/watched`, {});
  }

  static getVideoById(id: string): Promise<Video> {
    return fetch(this.buildURL(`videos/${id}`, false)).then((res) =>
      res.json()
    );
  }
}
