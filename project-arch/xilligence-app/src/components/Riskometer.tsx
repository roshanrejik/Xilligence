import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronUp, ChevronDown } from 'lucide-react-native';
import { COLORS } from '../constants/theme';

export const Riskometer = () => {
    const [expanded, setExpanded] = useState(true);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.headerRow} onPress={() => setExpanded(!expanded)} activeOpacity={0.7}>
                <Text style={styles.title}>Riskometer</Text>
                {expanded ? <ChevronUp color={COLORS.textMuted} size={20} /> : <ChevronDown color={COLORS.textMuted} size={20} />}
            </TouchableOpacity>

            {expanded && (
                <View style={styles.content}>
                    {/* Gauge Bar */}
                    <View style={styles.gaugeContainer}>
                        <View style={[styles.gaugeSegment, { backgroundColor: '#6ea18a' }]} />
                        <View style={[styles.gaugeSegment, { backgroundColor: '#aed581' }]} />
                        <View style={[styles.gaugeSegment, { backgroundColor: '#fff176' }]} />
                        <View style={[styles.gaugeSegment, { backgroundColor: '#ffb74d' }]} />
                        <View style={[styles.gaugeSegment, { backgroundColor: '#ef5350' }]} />
                    </View>

                    {/* Labels */}
                    <View style={styles.labelsRow}>
                        <Text style={styles.label}>Low</Text>
                        <Text style={styles.label}>Low to{'\n'}Moderate</Text>
                        <Text style={styles.label}>Moderate</Text>
                        <Text style={styles.label}>Moderately{'\n'}High</Text>
                        <Text style={styles.label}>Very High</Text>
                    </View>

                    <Text style={styles.disclaimerText}>
                        Investors must understand that their investment will be at
                    </Text>

                    <View style={styles.badgeContainer}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>Very High Risk</Text>
                        </View>
                    </View>
                </View>
            )}
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
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#111827',
    },
    content: {
        paddingTop: 24,
        paddingBottom: 8,
    },
    gaugeContainer: {
        height: 12,
        flexDirection: 'row',
        borderRadius: 6,
        overflow: 'hidden',
        width: '100%',
    },
    gaugeSegment: {
        flex: 1,
    },
    labelsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingHorizontal: 4,
    },
    label: {
        fontSize: 9,
        color: COLORS.black,
        fontWeight: '500',
        textAlign: 'center',
        width: '20%',
    },
    disclaimerText: {
        textAlign: 'center',
        fontSize: 11,
        color: COLORS.textSecondary,
        marginTop: 20,
    },
    badgeContainer: {
        alignItems: 'center',
        marginTop: 8,
    },
    badge: {
        backgroundColor: '#ff4d5e',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    badgeText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: 'bold',
    }
});
