interface User {
  id: number;
  name?: string;
  email: string;
  plan: string;
  events: Event[];
  createdAt: Date;
}

interface Event {
  id: number;
  channel: string;
  event: string;
  userId: number;
  icon: string;
  notify: boolean;
  tags: Record<any, any>;
  createdAt: Date;
}
