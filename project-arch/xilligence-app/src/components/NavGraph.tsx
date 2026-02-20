import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Canvas, Path, LinearGradient, vec } from '@shopify/react-native-skia';
import { COLORS } from '../constants/theme';

interface NavDataPoint {
    nav: number;
    nav_date: string;
}

interface NavGraphProps {
    data: NavDataPoint[];
}

const { width } = Dimensions.get('window');
// Padding 16 on each side
const GRAPH_WIDTH = width - 32;
const GRAPH_HEIGHT = 224; // h-56

export const NavGraph: React.FC<NavGraphProps> = ({ data }) => {
    const pathData = useMemo(() => {
        if (!data || data.length === 0) return null;

        // We can use a subset of data to make the graph look cleaner if there are hundreds of points,
        // but Skia handles it fine.
        const navs = data.map((d) => d.nav);
        const minNav = Math.min(...navs);
        const maxNav = Math.max(...navs);
        // Add some padding to max/min so graph doesn't touch the absolute top/bottom boundaries
        const padding = (maxNav - minNav) * 0.1;
        const adjustedMin = minNav - padding;
        const navRange = (maxNav + padding) - adjustedMin || 1;

        const path = `M 0 ${GRAPH_HEIGHT - ((navs[0] - adjustedMin) / navRange) * GRAPH_HEIGHT}`;

        const lines = data.map((d, index) => {
            const x = (index / (data.length - 1)) * GRAPH_WIDTH;
            const y = GRAPH_HEIGHT - ((d.nav - adjustedMin) / navRange) * GRAPH_HEIGHT;
            return `L ${x} ${y}`;
        }).join(' ');

        const completePath = `${path} ${lines}`;

        // For gradient area
        const gradientPath = `${completePath} L ${GRAPH_WIDTH} ${GRAPH_HEIGHT} L 0 ${GRAPH_HEIGHT} Z`;

        return { linePath: completePath, gradientPath };
    }, [data]);

    if (!pathData) {
        return <View style={styles.container}><Text>No Graph Data</Text></View>;
    }

    return (
        <View style={styles.container}>
            {/* Header matching HTML */}
            <View style={styles.header}>
                <Text style={styles.title}>Return</Text>
                <View style={styles.returnRow}>
                    <Text style={styles.returnValue}>12.32%</Text>
                    <Text style={styles.returnLabel}>1M return</Text>
                </View>
            </View>

            <View style={styles.chartContainer}>
                {/* Tooltip Overlay Simulation matching HTML */}
                <View style={styles.tooltipBox}>
                    <View style={styles.tooltipRow}>
                        <View style={styles.tooltipDot} />
                        <Text style={styles.tooltipNav}>NAV: ₹12.32</Text>
                    </View>
                    <Text style={styles.tooltipDate}>28 Dec'25</Text>
                </View>

                {/* Vertical Dashed Line Simulation */}
                <View style={styles.dashedLine} />

                {/* Point Indicator */}
                <View style={styles.pointIndicator} />

                <Canvas style={{ width: GRAPH_WIDTH, height: GRAPH_HEIGHT }}>
                    <Path path={pathData.gradientPath} color="transparent">
                        {/* Gradient from rgba(108, 165, 136, 0.4) to transparent */}
                        <LinearGradient
                            start={vec(0, 0)}
                            end={vec(0, GRAPH_HEIGHT)}
                            colors={[`rgba(108, 165, 136, 0.4)`, `rgba(108, 165, 136, 0.0)`]}
                        />
                    </Path>
                    <Path
                        path={pathData.linePath}
                        color={COLORS.primaryLight}
                        style="stroke"
                        strokeWidth={2}
                    />
                </Canvas>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 16,
        paddingTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        overflow: 'hidden',
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 2,
    },
    returnRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
    },
    returnValue: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COLORS.success,
    },
    returnLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textMuted,
    },
    chartContainer: {
        height: GRAPH_HEIGHT,
        width: GRAPH_WIDTH,
        position: 'relative',
    },
    tooltipBox: {
        position: 'absolute',
        top: 8,
        right: 56, // matching right-14
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#f9fafb',
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 5,
    },
    tooltipRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 2,
    },
    tooltipDot: {
        width: 8,
        height: 8,
        backgroundColor: COLORS.success,
        borderRadius: 2,
    },
    tooltipNav: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    tooltipDate: {
        fontSize: 10,
        fontWeight: '500',
        color: COLORS.textMuted,
        paddingLeft: 16,
    },
    dashedLine: {
        position: 'absolute',
        top: 32,
        bottom: 0,
        right: 112, // right-28 (~112px)
        width: 1,
        borderLeftWidth: 1,
        borderColor: COLORS.textMuted,
        borderStyle: 'dashed',
        zIndex: 0,
    },
    pointIndicator: {
        position: 'absolute',
        top: 68,
        right: 109,
        width: 10,
        height: 10,
        backgroundColor: COLORS.success,
        borderWidth: 2,
        borderColor: COLORS.white,
        borderRadius: 5,
        zIndex: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    }
});
