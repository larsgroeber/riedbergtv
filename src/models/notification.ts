export enum NotificationType {
  toast,
  alert,
}

export interface Notification {
  name: string;
  content: string;
  startDate: Date;
  endDate: Date;
  type: NotificationType;
}
