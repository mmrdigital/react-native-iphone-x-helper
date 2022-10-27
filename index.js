import { Dimensions, Platform, StatusBar } from 'react-native';

/*                   screen      (safe inset, statusbar,  bottom)
- iPhone 14        : 390 x 844   (47, 47, 34)
- iPhone 13        :             
- iPhone 12        :             
- iPhone 11        : 414 x 896   (48, 48,   )
- iPhone X         : 375 x 812   (44, 44,   )

- iPhone 13 mini   : 375 x 812   (50, 50, 34)
- iPhone 12 mini   : 375 x 812   (50, 44,  ?)
                     320 x 693   (??)

- iPhone 14 Pro    : 393 x 852   (59, 59, 34)

- iPhone 13 Pro    : 390 x 844   (47, 47, 34)
- iPhone 12 Pro    : 390 x 844   (47, 47,   )
- iPhone 11 Pro    : 375 x 812

- iPhone 14 Plus   : 428 x 926   (47, 47,  34)

- iPhone 14 Pro Max: 430 x 932   (59, 59,  34) 
- iPhone 13 Pro Max: 428 x 926   (47,  ?,  34)
- iPhone 12 Pro Max: 428 x 926   (47, 47,    )
- iPhone 11 Pro Max: 414 x 896




*/
export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 780 || dimen.width === 780)
          || (dimen.height === 812 || dimen.width === 812)
          || (dimen.height === 844 || dimen.width === 844)
          || (dimen.height === 896 || dimen.width === 896)
          || (dimen.height === 926 || dimen.width === 926)
          || (dimen.height === 852 || dimen.width === 852) // iPhone 14 Pro
          || (dimen.height === 932 || dimen.width === 932) // iPhone 14 Pro Max
          || (dimen.height === 693 || dimen.width === 693) // iPhone 12 mini (Dimensions React-native function return 320 x 693 instead of 375 x 812))
          )
    );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
}

export function getStatusBarHeight(safe) {
    return Platform.select({
        ios: ifIphoneX(safe ? 44 : 30, 20),
        android: StatusBar.currentHeight,
        default: 0
    });
}

export function getBottomSpace() {
    return isIphoneX() ? 34 : 0;
}
