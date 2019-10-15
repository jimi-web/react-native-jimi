import { PureComponent, ReactElement } from 'react';
import { Animated, PanResponderInstance, ViewStyle, RegisteredStyle } from 'react-native';
import Coord from './Coord';
export interface SliderProps {
    style?: ViewStyle | RegisteredStyle<ViewStyle>;
    value?: number | number[];
    min?: number;
    max?: number;
    disabled?: boolean;
    step?: number;
    marks?: any[];
    range?: boolean;
    vertical?: boolean;
    trackWeight?: number;
    thumbSize?: number;
    maxTrackColor?: string;
    minTrackColor?: string;
    midTrackColor?: string;
    onChange?: (value: number | number[]) => void;
    showTip?: boolean;
    renderTip?: (value: any) => ReactElement<any>;
    renderThumb?: (isOther: any) => ReactElement<any>;
}
interface State {
    containerSize: {
        width: number;
        height: number;
    };
    trackSize: {
        width: number;
        height: number;
    };
    thumbSize: {
        width: number;
        height: number;
    };
    otherThumbSize: {
        width: number;
        height: number;
    };
    value: Animated.Value;
    otherValue: Animated.Value;
    tip: string;
    otherTip: string;
}
export default class Slider extends PureComponent<SliderProps, State> {
    oldValue: any;
    oldOtherValue: any;
    panResponder: PanResponderInstance;
    previousLeft: number;
    otherPreviousLeft: number;
    isOther: boolean;
    showAndroidTip: boolean;
    static defaultProps: {
        value: number;
        min: number;
        max: number;
        step: number;
        maxTrackColor: any;
        minTrackColor: any;
        midTrackColor: any;
        range: boolean;
        vertical: boolean;
        showTip: boolean;
        trackWeight: number;
        thumbSize: number;
    };
    constructor(props: any);
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    /**
     * 通过props获取滑块对应的value值
     */
    getValueByProps: (isOther?: boolean) => number;
    /**
     * 判断用户触控的区域是否在滑块上
     */
    thumbTouchCheck: (e: any) => boolean;
    getThumbCoord: (isOther?: boolean) => Coord;
    /**
     * 滚动状态响应
     */
    scroll: (gestureState: Object) => void;
    touchStart: (e: Object) => boolean;
    pressStart: () => void;
    lastMove: (_: Object, gestureState: Object) => void;
    touchEnd: (_: Object, gestureState: Object) => void;
    measureContainer: (x: Object) => void;
    measureTrack: (x: Object) => void;
    measureThumb: (x: Object) => void;
    measureOtherThumb: (x: Object) => void;
    handleMeasure: (name: string, x: any) => void;
    /**
     * 获取可滑动长度
     */
    getScrollLength: () => number;
    /**
     * 获取滑块的坐标的宽度
     * 如果是横向slider则取width,纵向取height
     */
    getThumbOffset: (isOther?: boolean) => number;
    /**
     * 获取当前value值所占的百分比
     */
    getRatio: (value: number) => number;
    /**
     * 滑块在滑动轴上的偏移量
     * value => x
     */
    getThumbLeft: (value: number) => number;
    /**
     * 互斥prop
     * 刻度属性只有正在非纵向轴、非双滑块下才生效
     */
    showStep: () => boolean;
    /**
     * 获取滑动位置所对应的value值，和getThumbLeft方法对应
     * x => value
     */
    getValue: (gestureState: Object, isOther?: boolean) => number;
    /**
     * 获取滑块的value值
     */
    getCurrentValue: (isOther?: boolean) => any;
    setCurrentValue: (value: number, isOther?: boolean) => void;
    triggerEvent: (event: any) => void;
    /**
     * 默认滑块的的滑块图片渲染
     */
    renderThumbImage: (isOther?: boolean) => JSX.Element;
    /**
     * 刻度模块的渲染
     */
    renderMarks: () => JSX.Element;
    /**
     * 渲染滑块的toopTip提示
     */
    renderThumbToolTip: (isOther?: boolean) => JSX.Element;
    /**
     * 滑动的起始和结束x值
     */
    getScrollRange: () => number[];
    /**
     * 滑块渲染
     */
    renderThumb: (isOther?: boolean) => JSX.Element;
    /**
     * 两个滑块值比较，滑块A的值是否大于B
     */
    compareValue: () => boolean;
    /**
     * 滑轨色值计算
     * 双滑块模式下，需要根据两个滑块的值大小结果互换色值
     * 垂直滑块模式下，因为滑块的渲染是从顶部计算的，所以滑块需要使用反向色值来实现从底部滑动的效果
     * 假设滑块A,B
     */
    getTrackColor: (isOther?: boolean) => string[];
    /**
     * 默认滑块划过的滑轨
     */
    renderMinimumTrack: (isOther?: boolean) => JSX.Element;
    getTrackStyle: () => any;
    renderTracks: () => JSX.Element[];
    render(): JSX.Element;
}
export {};
