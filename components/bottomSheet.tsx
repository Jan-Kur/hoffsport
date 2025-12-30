import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useRef } from "react";
import { BackHandler, NativeEventSubscription, useColorScheme } from "react-native";

type Props = {
  children: React.ReactNode
  snapPoints?: string[]
}

type Ref = BottomSheetModal

export const CustomSheet = forwardRef<Ref, Props>((props, ref) => {
  const { children, snapPoints = ["50%"] } = props

  const colorScheme = useColorScheme();

  const backHandler = useRef<NativeEventSubscription | null>(null);
  const handleChange = (index: number) => {
    if (index >= 0 && !backHandler.current) {
      backHandler.current = BackHandler.addEventListener('hardwareBackPress', () => {
        if (typeof ref !== 'function' && ref?.current) {
          ref.current.close();
        }
        return true;
      }); 
    } else if (index < 0) {
      backHandler.current?.remove();
      backHandler.current = null;
    }
  };

  const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				appearsOnIndex={0}
        disappearsOnIndex={-1}
			/>
		),
		[]
	)
  
  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={{backgroundColor: colorScheme === "dark" ? "#191A1A" : "#E5E6E6", borderRadius: 25}}
      handleIndicatorStyle={{backgroundColor: colorScheme === "dark" ? "#055561" : "#087F91"}}
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      onChange={handleChange}
    >
      {children}
    </BottomSheetModal>
  )
})