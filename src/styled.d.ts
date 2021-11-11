// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    bgOpacityColor: string;
    accentColor: string;
    accentColor2: string;
    bgAccentColor: string;
    bgAccentColor2: string;
  }
}
