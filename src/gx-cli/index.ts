import {
  Rule,
  apply,
  url,
  mergeWith,
  template,
  move,
  branchAndMerge,
} from "@angular-devkit/schematics";
import { schemaOptions } from "./schema";
import { strings } from "@angular-devkit/core";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function gxCli(options: schemaOptions): Rule {
  const path = options.name;
  let urlPath;
  switch (options.type) {
    case "ng":
      urlPath = "../ng-new";
      break;
    case "java":
      urlPath = "../java";
      break;
    case "ionic3":
      urlPath = "../ionic3";
      break;
    case "ionic4":
      urlPath = "../ionic4";
      break;
    default:
      urlPath = "../ng-new";
      break;
  }
  return branchAndMerge(
    mergeWith(
      apply(url(urlPath), [
        template({
          ...strings,
          ...options,
          dot: ".",
        }),
        move(`./${path}`),
      ]),
    ),
  );
}
