import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from '../constants/theme';

export const ReturnCalculator = () => {
    const [isSip, setIsSip] = useState(true);
    const durations = ['1M', '3M', '6M', '1Y', '3Y', '5Y'];
    const [activeDuration, setActiveDuration] = useState('1Y');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Return Calculator</Text>

            {/* Toggle */}
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={isSip ? styles.toggleActive : styles.toggleInactive}
                    onPress={() => setIsSip(true)}
                >
                    <Text style={isSip ? styles.toggleTextActive : styles.toggleTextInactive}>
                        Monthly SIP
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={!isSip ? styles.toggleActive : styles.toggleInactive}
                    onPress={() => setIsSip(false)}
                >
                    <Text style={!isSip ? styles.toggleTextActive : styles.toggleTextInactive}>
                        One Time
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Slider Area (Mocked visually) */}
            <View style={styles.sliderArea}>
                <View style={styles.sliderHeader}>
                    <Text style={styles.sliderLabel}>
                        {isSip ? 'Monthly SIP Amount' : 'One Time Amount'}
                    </Text>
                    <View style={styles.amountBadge}>
                        <Text style={styles.amountText}>₹5000</Text>
                    </View>
                </View>

                {/* Custom Range Slider Track visual */}
                <View style={styles.trackContainer}>
                    <View style={styles.trackBackground} />
                    <View style={[styles.trackFill, { width: '30%' }]} />
                    <View style={[styles.thumb, { left: '30%' }]} />
                </View>

                <View style={styles.rangeLabels}>
                    <Text style={styles.rangeText}>₹500</Text>
                    <Text style={styles.rangeText}>₹50,000</Text>
                </View>
            </View>

            {/* Duration Selector */}
            <View style={styles.durationArea}>
                <Text style={styles.durationLabel}>Select Duration</Text>
                <View style={styles.durationList}>
                    {durations.map((d) => (
                        <TouchableOpacity
                            key={d}
                            style={[
                                styles.durationBtn,
                                activeDuration === d ? styles.durationBtnActive : {}
                            ]}
                            onPress={() => setActiveDuration(d)}
                        >
                            <Text
                                style={[
                                    styles.durationBtnText,
                                    activeDuration === d ? styles.durationBtnTextActive : {}
                                ]}
                            >
                                {d}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Result Card */}
            <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>
                    Total Investment <Text style={styles.resultValueObj}>₹1,11,000</Text>
                </Text>
                <Text style={styles.resultSubLabel}>
                    Would have become <Text style={styles.resultValueGreen}>₹3,93,192 (+0.82%)</Text>
                </Text>
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
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 24,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#e2e8f0', // gray-200
        borderRadius: 24,
        padding: 4,
        marginBottom: 32,
    },
    toggleActive: {
        flex: 1,
        backgroundColor: COLORS.primaryLight,
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    toggleInactive: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleTextActive: {
        color: COLORS.white,
        fontSize: 13,
        fontWeight: 'bold',
    },
    toggleTextInactive: {
        color: COLORS.textSecondary,
        fontSize: 13,
        fontWeight: 'bold',
    },
    sliderArea: {
        marginBottom: 40,
    },
    sliderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    sliderLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151', // gray-700
    },
    amountBadge: {
        backgroundColor: COLORS.primaryLight,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    amountText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    trackContainer: {
        height: 24,
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 8,
    },
    trackBackground: {
        height: 4,
        backgroundColor: '#e2e8f0',
        width: '100%',
        borderRadius: 2,
    },
    trackFill: {
        height: 4,
        backgroundColor: COLORS.primaryLight,
        position: 'absolute',
        left: 0,
        borderRadius: 2,
    },
    thumb: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        borderWidth: 4,
        borderColor: '#5c9479',
        marginLeft: -12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    rangeLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rangeText: {
        fontSize: 10,
        color: COLORS.textMuted,
        fontWeight: '500',
    },
    durationArea: {
        marginBottom: 32,
    },
    durationLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 16,
    },
    durationList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    durationBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: COLORS.white,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 3,
    },
    durationBtnActive: {
        backgroundColor: COLORS.primaryLight,
        borderColor: COLORS.primaryLight,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    durationBtnText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    durationBtnTextActive: {
        color: COLORS.white,
    },
    resultCard: {
        backgroundColor: '#f3f8f6',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0ece6',
    },
    resultLabel: {
        color: COLORS.textSecondary,
        fontSize: 13,
        fontWeight: '500',
        marginBottom: 6,
    },
    resultValueObj: {
        color: '#111827',
        fontWeight: 'bold',
    },
    resultSubLabel: {
        color: '#4b5563', // gray-600
        fontWeight: '600',
    },
    resultValueGreen: {
        color: COLORS.success,
        fontWeight: 'bold',
    }
});
