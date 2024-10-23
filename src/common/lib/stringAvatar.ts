import { stringToColor } from "./stringToColor";

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.substring(0, 2)}`
  };
}
