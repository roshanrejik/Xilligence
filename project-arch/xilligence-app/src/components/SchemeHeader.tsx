import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Sparkles, Bookmark, Triangle, Star } from 'lucide-react-native';
import { COLORS, SPACING } from '../constants/theme';
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
            {/* Curved Green Backdrop */}
            <View style={styles.greenBackdrop} />

            {/* Fund Card */}
            <View style={styles.fundCard}>
                {/* Header row: Tags + Bookmark */}
                <View style={styles.topRow}>
                    <View style={styles.tagsContainer}>
                        <View style={styles.tag}><Text style={styles.tagText}>{categoryName}</Text></View>
                        <View style={styles.tag}><Text style={styles.tagText}>{subCategoryName}</Text></View>
                        <View style={styles.tag}><Text style={styles.tagText}>{i18n.t('schemeDetails.tags.growth', { defaultValue: 'Growth' })}</Text></View>
                    </View>
                    <TouchableOpacity style={styles.bookmarkBtn} activeOpacity={0.7}>
                        <Bookmark size={24} color={COLORS.primary} strokeWidth={1.5} />
                    </TouchableOpacity>
                </View>

                {/* Title & Logo */}
                <View style={styles.titleRow}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoInner}>
                            {/* Dummy Title to simulate turtle logo/text */}
                            <Text style={styles.logoSmallText}>PPFAS</Text>
                        </View>
                    </View>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.title}>{schemeName || 'Parag Parikh Flexicap Fund'}</Text>
                        <View style={styles.resilientWrapper}>
                            <View style={styles.resilientBadge}>
                                <Sparkles size={11} color={COLORS.white} fill={COLORS.white} style={{ marginRight: 4 }} />
                                <Text style={styles.resilientText}>RESILIENT</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Metrics Grid */}
                <View style={styles.metricsGrid}>
                    <View style={styles.metricCell}>
                        <Text style={styles.metricLabel}>NAV : 28 Dec 2025</Text>
                        <View style={styles.metricValueRow}>
                            <Text style={styles.metricValue}>₹{navValue || '92.0201'}</Text>
                            <View style={styles.positiveChange}>
                                <Triangle size={8} color={COLORS.success} fill={COLORS.success} style={{ marginTop: 1, marginRight: 4 }} />
                                <Text style={styles.positiveText}>₹0.15 (+0.31%)</Text>
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
                <Text style={styles.quoteText}>
                    “A value-driven flexicap fund with global diversification that has consistently beaten its category average over long-term horizons, offering strong risk-adjusted returns.”
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        paddingTop: 16,
        paddingBottom: 24,
    },
    greenBackdrop: {
        position: 'absolute',
        top: -100, // extend high up to ensure seamless flow from navbar
        left: 0,
        right: 0,
        height: 250, // controls how far down the card the green goes
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    fundCard: {
        backgroundColor: COLORS.primaryBg, // #eaf5f0
        marginHorizontal: 16,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 4,
        marginBottom: 16,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 8,
        flex: 1,
        flexWrap: 'wrap',
    },
    tag: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        backgroundColor: COLORS.white,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgba(92, 148, 121, 0.3)', // subtle green border
    },
    tagText: {
        fontSize: 11,
        fontWeight: '500',
        color: COLORS.textDark,
    },
    bookmarkBtn: {
        padding: 4,
        marginLeft: 8,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    logoContainer: {
        width: 52,
        height: 52,
        backgroundColor: COLORS.white,
        borderRadius: 26,
        padding: 4,
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    logoInner: {
        flex: 1,
        backgroundColor: '#fff7ed',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#ffedd5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoSmallText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#9a3412',
    },
    titleTextContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        lineHeight: 24,
        marginBottom: 8,
    },
    resilientWrapper: {
        alignSelf: 'flex-start',
    },
    resilientBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00b297', // Teal-500 from design
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
    },
    resilientText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    metricCell: {
        width: '50%',
        marginBottom: 20,
        paddingRight: 8,
    },
    metricLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textSecondary,
        marginBottom: 6,
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
        marginLeft: 6,
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
    },
    quoteText: {
        fontSize: 12,
        color: COLORS.textDark,
        fontStyle: 'italic',
        lineHeight: 18,
        marginTop: 4,
    }
});
