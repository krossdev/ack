// Copyright (c) 2021 Kross Ack Project.

class Router {
  patterns: string[] = [];

  get(path: string, handler: any) {
    const pattern = path;
    this.patterns.push(pattern);
  }

  use(path: string, router: Router) {}
}
