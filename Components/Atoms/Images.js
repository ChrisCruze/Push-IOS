// @flow
import { Asset } from "expo-asset";

import Cover from "../../assets/images/logo.jpg";

export default class Images {
  static cover = Cover;

  static downloadAsync() {
    return Promise([Asset.loadAsync(Images.cover)]);
  }
}
