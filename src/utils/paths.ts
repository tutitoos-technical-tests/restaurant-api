import path from "path";

export const getPathname = () => {
  let filename = path.resolve(process.cwd(), process.argv[1]);
  if (filename.includes("node_modules")) {
    filename = filename.split("node_modules")[0];
  }

  return filename;
};
