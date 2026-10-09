export const statePath = (name: string) =>
  `/${name.toLowerCase().replaceAll(" ", "-")}/`;
