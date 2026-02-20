import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { COLORS } from '../constants/theme';

interface DataPoint {
    label: string;
    value: number;
    color: string;
}

const data: DataPoint[] = [
    { label: 'Technology', value: 19.27, color: '#3b82f6' },
    { label: 'Services', value: 18.23, color: '#6366f1' },
    { label: 'Automobile', value: 16.16, color: '#c084fc' },
    { label: 'Capital', value: 15.19, color: '#fb923c' },
    { label: 'Consumer', value: 13.27, color: '#f43f5e' },
    { label: 'Others', value: 17.88, color: '#9ca3af' },
];

export const AllocationChart = () => {
    const size = 144; // w-36 h-36
    const strokeWidth = 24;
    const radius = (size - strokeWidth) / 2;
    const cx = size / 2;
    const cy = size / 2;

    // Calculate paths
    let currentAngle = -Math.PI / 2;
    const total = data.reduce((sum, item) => sum + item.value, 0);

    const paths = data.map((item) => {
        const angle = (item.value / total) * Math.PI * 2;
        const path = Skia.Path.Make();
        path.addArc(
            { x: strokeWidth / 2, y: strokeWidth / 2, width: size - strokeWidth, height: size - strokeWidth },
            (currentAngle * 180) / Math.PI,
            (angle * 180) / Math.PI
        );
        currentAngle += angle;
        return { path, color: item.color };
    });

    return (
        <View style={styles.container}>
            <View style={styles.chartWrapper}>
                <Canvas style={{ width: size, height: size }}>
                    {paths.map((p, i) => (
                        <Path
                            key={i}
                            path={p.path}
                            color={p.color}
                            style="stroke"
                            strokeWidth={strokeWidth}
                            strokeCap="butt"
                        />
                    ))}
                </Canvas>
            </View>

            <View style={styles.legendContainer}>
                {data.map((item, idx) => (
                    <View key={idx} style={styles.legendRow}>
                        <View style={styles.legendLeft}>
                            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                            <Text style={styles.legendLabel}>{item.label}</Text>
                        </View>
                        <Text style={styles.legendValue}>{item.value}%</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    chartWrapper: {
        width: 144,
        height: 144,
    },
    legendContainer: {
        flex: 1,
        marginLeft: 24,
        gap: 12,
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    legendLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#374151',
    },
    legendValue: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#111827',
    }
});
