import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Sparkles, Bookmark, Triangle, Star } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import i18n from '../utils/i18n';

interface SchemeHeaderProps {
    schemeName: string;
    categoryName: string;
    subCategoryName: string;
    navValue: number;
    oneYearReturn: number;
    aumValue: string;
    benchmarkIndex: string;
}

export const SchemeHeader: React.FC<SchemeHeaderProps> = ({
    schemeName,
    categoryName,
    subCategoryName,
    navValue,
    oneYearReturn,
    aumValue,
    benchmarkIndex,
}) => {
    return (
        <View style={styles.wrapper}>
            {/* Fund Card */}
            <View style={styles.fundCard}>
                {/* Decorative elements - simple simulated circles */}
                <View style={styles.decCircle} />

                {/* Tags */}
                <View style={styles.tagsContainer}>
                    <View style={styles.tag}><Text style={styles.tagText}>{categoryName}</Text></View>
                    <View style={styles.tag}><Text style={styles.tagText}>{subCategoryName}</Text></View>
                    <View style={styles.tag}><Text style={styles.tagText}>{i18n.t('schemeDetails.tags.growth', { defaultValue: 'Growth' })}</Text></View>
                </View>

                {/* Title & Logo */}
                <View style={styles.titleRow}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoInner}>
                            {/* Dummy Logo Text since we don't have the explicit turtle icon */}
                            <Text style={styles.logoSmallText}>PPFAS</Text>
                        </View>
                    </View>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.title}>{schemeName || 'Parag Parikh Flexicap Fund'}</Text>
                        <View style={styles.resilientBadge}>
                            <Sparkles size={10} color={COLORS.white} style={{ marginRight: 2 }} />
                            <Text style={styles.resilientText}>Resilient</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.bookmarkBtn}>
                        <Bookmark size={20} color={COLORS.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* Metrics Grid */}
                <View style={styles.metricsGrid}>
                    <View style={styles.metricCell}>
                        <Text style={styles.metricLabel}>NAV : 28 Dec 2025</Text>
                        <View style={styles.metricValueRow}>
                            <Text style={styles.metricValue}>₹{navValue || '92.0201'}</Text>
                            <View style={styles.positiveChange}>
                                <Triangle size={8} color={COLORS.success} fill={COLORS.success} style={{ marginTop: 1, marginRight: 2 }} />
                                <Text style={styles.positiveText}>+0.31%</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.metricCell}>
                        <Text style={styles.metricLabel}>AUM</Text>
                        <Text style={styles.metricValue}>{aumValue || '₹1,26,285 Cr.'}</Text>
                    </View>

                    <View style={styles.metricCell}>
                        <Text style={styles.metricLabel}>1 Yr Return</Text>
                        <Text style={styles.metricValue}>{oneYearReturn || '12.32'}%</Text>
                    </View>

                    <View style={styles.metricCell}>
                        <Text style={styles.metricLabel}>Benchmark Index</Text>
                        <Text style={styles.metricValue} numberOfLines={1}>{benchmarkIndex || 'S&P BSE PSU TR INR'}</Text>
                    </View>

                    <View style={styles.metricCell}>
                        <Text style={styles.metricLabel}>1 Yr Benchmark Return</Text>
                        <Text style={styles.metricValue}>10.12%</Text>
                    </View>

                    <View style={styles.metricCell}>
                        <Text style={styles.metricLabel}>Value Research Rating</Text>
                        <View style={styles.starsRow}>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} color={COLORS.success} fill={COLORS.success} />
                            ))}
                        </View>
                    </View>
                </View>

                {/* Description quote */}
                <View style={styles.quoteBox}>
                    <Text style={styles.quoteText}>
                        “A value-driven flexicap fund with global diversification that has consistently beaten its category average over long-term horizons, offering strong risk-adjusted returns.”
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLORS.background,
    },
    fundCard: {
        backgroundColor: COLORS.primaryBg,
        padding: SPACING.lg,
        paddingBottom: SPACING.xl,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        marginBottom: SPACING.xl,
        overflow: 'hidden',
    },
    decCircle: {
        position: 'absolute',
        right: -40,
        top: -40,
        width: 160,
        height: 160,
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 80,
        opacity: 0.5,
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: SPACING.sm,
        marginBottom: SPACING.lg,
    },
    tag: {
        paddingHorizontal: 14,
        paddingVertical: 4,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    tagText: {
        fontSize: 11,
        fontWeight: '500',
        color: COLORS.textDark,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: SPACING.xl,
    },
    logoContainer: {
        width: 56,
        height: 56,
        backgroundColor: COLORS.white,
        borderRadius: 28,
        padding: 4,
        marginRight: SPACING.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    logoInner: {
        flex: 1,
        backgroundColor: '#fff7ed', // orange-50
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#ffedd5', // orange-100
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoSmallText: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#9a3412', // orange-800
    },
    titleTextContainer: {
        flex: 1,
        marginRight: SPACING.sm,
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
        color: COLORS.text,
        lineHeight: 24,
        marginBottom: 4,
    },
    resilientBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.accent,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    resilientText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: '600',
    },
    bookmarkBtn: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: 8,
        borderRadius: 20,
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: SPACING.xl,
    },
    metricCell: {
        width: '50%',
        marginBottom: SPACING.lg,
        paddingRight: SPACING.sm,
    },
    metricLabel: {
        fontSize: 11,
        fontWeight: '500',
        color: COLORS.textSecondary,
        marginBottom: 2,
    },
    metricValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metricValue: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    positiveChange: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 4,
    },
    positiveText: {
        fontSize: 11,
        fontWeight: '600',
        color: COLORS.success,
    },
    starsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        marginTop: 2,
    },
    quoteBox: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
    },
    quoteText: {
        fontSize: 11,
        color: '#4b5563',
        fontStyle: 'italic',
        lineHeight: 16,
    }
});
