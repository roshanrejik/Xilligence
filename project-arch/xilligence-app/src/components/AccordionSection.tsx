import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

interface AccordionSectionProps {
    title: string;
    children: React.ReactNode;
    initiallyExpanded?: boolean;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({
    title,
    children,
    initiallyExpanded = false,
}) => {
    const [expanded, setExpanded] = useState(initiallyExpanded);

    const heightValue = useSharedValue(initiallyExpanded ? 1 : 0);

    const toggleAccordion = () => {
        setExpanded(!expanded);
        heightValue.value = withTiming(expanded ? 0 : 1, { duration: 300 });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: heightValue.value,
            // For simple Accordion, dynamic height can be complex with Reanimated without measure.
            // Easiest is to unmount or use a wrapper. Wait, since it's required to expand smoothly:
            // using simple conditional rendering is not "smooth", but we can animate opacity / scale.
            // Another approach is simply conditionally rendering to avoid measure complexities 
            // when content size is unknown in React Native. Or we can just use Collapsible if we had react-native-collapsible.
            // Given the requirement "On click, section expands smoothly", we will use a basic reanimated layout transition if possible,
            // but conditionally rendering `children` is safer for basic implementations without extra libraries.
            display: heightValue.value === 0 ? 'none' : 'flex'
        };
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                onPress={toggleAccordion}
                activeOpacity={0.7}
            >
                <Text style={styles.title}>{title}</Text>
                <Ionicons
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={COLORS.secondary}
                />
            </TouchableOpacity>
            <Animated.View style={[styles.content, animatedStyle]}>
                {expanded && children}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
    },
    title: {
        fontSize: FONT_SIZES.md,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    content: {
        paddingTop: SPACING.sm,
        paddingBottom: SPACING.md,
    },
});
