import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronUp } from 'lucide-react-native';
import { COLORS } from '../constants/theme';

export const ReturnAnalysis = () => {
    // Hardcoded for demo matching HTML
    const labels = ['3M', '6M', '1Y', '3Y', 'Max'];
    const values = [9, 10, 15, 11, 9];
    const maxValue = 18;

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Return Analysis</Text>
                <ChevronUp color={COLORS.textMuted} size={20} />
            </View>

            <View style={styles.toggleContainer}>
                <TouchableOpacity style={styles.toggleActive} activeOpacity={0.8}>
                    <Text style={styles.toggleTextActive}>Point to Point</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toggleInactive} activeOpacity={0.8}>
                    <Text style={styles.toggleTextInactive}>SIP Returns</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.chartContainer}>
                {/* Y-Axis labels (simulated) */}
                <View style={styles.yAxis}>
                    <Text style={styles.yLabel}>18%</Text>
                    <Text style={styles.yLabel}>16%</Text>
                    <Text style={styles.yLabel}>14%</Text>
                    <Text style={styles.yLabel}>12%</Text>
                    <Text style={styles.yLabel}>10%</Text>
                    <Text style={styles.yLabel}>8%</Text>
                    <Text style={styles.yLabel}>6%</Text>
                    <Text style={styles.yLabel}>4%</Text>
                    <Text style={styles.yLabel}>2%</Text>
                    <Text style={styles.yLabel}>0%</Text>
                </View>

                {/* Bars */}
                <View style={styles.barsArea}>
                    {values.map((val, index) => {
                        const heightPercent = (val / maxValue) * 100;
                        return (
                            <View key={index} style={styles.barColumn}>
                                <View style={styles.barWrapper}>
                                    <Text style={styles.barValueLabel}>{val}%</Text>
                                    <View style={[styles.bar, { height: `${heightPercent}%` }]} />
                                </View>
                                <Text style={styles.xLabel}>{labels[index]}</Text>
                            </View>
                        );
                    })}
                </View>
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
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#111827',
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBgLight,
        borderRadius: 8,
        padding: 4,
        marginBottom: 32,
    },
    toggleActive: {
        flex: 1,
        backgroundColor: COLORS.primaryLight,
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    toggleInactive: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleTextActive: {
        color: COLORS.white,
        fontSize: 13,
        fontWeight: '600',
    },
    toggleTextInactive: {
        color: COLORS.textSecondary,
        fontSize: 13,
        fontWeight: '600',
    },
    chartContainer: {
        height: 200,
        flexDirection: 'row',
        marginTop: 10,
    },
    yAxis: {
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingBottom: 24,
    },
    yLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: '#94a3b8',
    },
    barsArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    barColumn: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'flex-end',
        width: 32,
    },
    barWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        marginBottom: 8,
    },
    barValueLabel: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#64748b',
        marginBottom: 4,
    },
    bar: {
        width: 32,
        backgroundColor: COLORS.primaryLight,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    xLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#64748b',
        marginTop: 4,
    }
});
