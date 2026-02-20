import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator, Platform, StatusBar } from 'react-native';
import { ChevronUp, ChevronDown, PieChart, Lock, FileCheck, RotateCw, Calendar, Landmark, Folder, Contact, Activity, TrendingUp, ArrowDownToLine, ArrowUpToLine, Percent, BadgeAlert, ChevronLeft, Search, ShoppingCart } from 'lucide-react-native';
import { SchemeHeader } from '../components/SchemeHeader';
import { NavGraph } from '../components/NavGraph';
import { ReturnAnalysis } from '../components/ReturnAnalysis';
import { ReturnCalculator } from '../components/ReturnCalculator';
import { Riskometer } from '../components/Riskometer';
import { AllocationChart } from '../components/AllocationChart';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import i18n from '../utils/i18n';
import SchemeData from '../data/scheme.json';



const AccordionSection = ({ title, children, defaultExpanded = false }: any) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <View style={styles.sectionContainer}>
            <TouchableOpacity
                style={styles.sectionHeaderRow}
                onPress={() => setExpanded(!expanded)}
                activeOpacity={0.7}
            >
                <Text style={styles.sectionTitle}>{title}</Text>
                {expanded ? <ChevronUp color={COLORS.textMuted} size={20} /> : <ChevronDown color={COLORS.textMuted} size={20} />}
            </TouchableOpacity>
            {expanded && (
                <View style={styles.sectionContent}>
                    {children}
                </View>
            )}
        </View>
    );
};

export const SchemeDetailsScreen = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        // Simulate loading data
        setData(SchemeData.result[0].mf_schemes[0]);
    }, []);

    if (!data) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    const {
        scheme_name,
        category_name,
        sub_category_name,
        nav,
        aum,
        benchmark_index: benchmark,
        nav_json,
    } = data;

    // Assuming data mapping mappings based on new json / dummy
    return (
        <View style={styles.safeArea}>
            {/* Top Fixed Header */}
            <View style={styles.topHeader}>
                <SafeAreaView />
                <View style={styles.headerContent}>
                    <TouchableOpacity style={styles.backBtn} activeOpacity={0.8}>
                        <ChevronLeft color={COLORS.white} size={28} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{i18n.t('schemeDetails.title')}</Text>
                    <View style={styles.headerRight}>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Search color={COLORS.white} size={22} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={styles.cartBtn}>
                            <ShoppingCart color={COLORS.white} size={22} />
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>3</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }} // For sticky footer
            >
                <SchemeHeader
                    schemeName={scheme_name}
                    categoryName={category_name}
                    subCategoryName={sub_category_name}
                    navValue={nav}
                    oneYearReturn={12.32} // Dummy map if not direct
                    aumValue={aum}
                    benchmarkIndex={benchmark}
                />

                <NavGraph data={nav_json || []} />



                <ReturnAnalysis />



                {/* Analytics Section */}
                <AccordionSection title="Analytics" defaultExpanded={true}>
                    <View style={styles.analyticsList}>
                        {/* Using mock data identical to HTML */}
                        <AnalyticsRow icon={<Text style={styles.boldChar}>β</Text>} title="Beta : 0.85" subtitle="Slightly less volatile than the market" />
                        <AnalyticsRow icon={<TrendingUp color="#059669" size={20} />} title="Std. Deviation: 12%" subtitle="Moderate volatility compared to peers" />
                        <AnalyticsRow icon={<Percent color="#059669" size={20} />} title="Sharpe Ratio: 0.9 – 1.0" subtitle="Strong risk-adjusted returns" />
                        <AnalyticsRow icon={<Text style={styles.boldChar}>α</Text>} title="Alpha" subtitle="Reflects how much a fund has outperformed its benchmark." />
                        <AnalyticsRow icon={<TrendingUp color="#059669" size={20} />} title="Sortino Ratio: 1.2 – 1.4" subtitle="Good downside protection with strong return profile" />
                        <AnalyticsRow icon={<ArrowDownToLine color="#059669" size={20} />} title="Down Capture: 70–75%" subtitle="Falls less than the market in downturns" />
                        <AnalyticsRow icon={<Activity color="#059669" size={20} />} title="Std. Deviation: 0.5" subtitle="Very low volatility, indicating highly stable and consistent performance." />
                        <AnalyticsRow icon={<ArrowUpToLine color="#059669" size={20} />} title="Up Capture: 95–100%" subtitle="Captures almost all upside of the market." />
                        <AnalyticsRow icon={<BadgeAlert color="#059669" size={20} />} title="Information Ratio: 0.5 – 0.7" subtitle="Reasonably consistent in generating alpha over benchmark." />
                    </View>
                </AccordionSection>



                <AccordionSection title="Allocation Analysis" defaultExpanded={false}>
                    <View style={styles.allocationTabs}>
                        <Text style={[styles.allocTab, styles.allocTabActive]}>Asset Class</Text>
                        <Text style={styles.allocTab}>Sector</Text>
                    </View>
                    <AllocationChart />
                </AccordionSection>



                {/* Holding Analysis */}
                <AccordionSection title="Holding Analysis" defaultExpanded={false}>
                    <View style={styles.tableContainer}>
                        <View style={styles.tableHead}>
                            <Text style={[styles.th, { flex: 2 }]}>Security name</Text>
                            <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>Value (Mn)</Text>
                            <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>Holding %</Text>
                        </View>

                        {[
                            ['National Aluminium Co', '₹98', '3.3'],
                            ['Kalyan Jewellers India', '₹98', '5.3'],
                            ['Tata Communications', '₹97', '4.3'],
                            ['Hindustan Unilever', '₹95', '4.3'],
                            ['Adani Green Energy', '₹96', '1.3'],
                            ['TVS Motor Company', '₹98', '1.3'],
                        ].map((row, i) => (
                            <View key={i} style={styles.tr}>
                                <Text style={[styles.td, { flex: 2, color: '#374151', fontWeight: '500' }]}>{row[0]}</Text>
                                <Text style={[styles.td, { flex: 1, textAlign: 'right', fontWeight: 'bold' }]}>{row[1]}</Text>
                                <Text style={[styles.td, { flex: 1, textAlign: 'right' }]}>{row[2]}</Text>
                            </View>
                        ))}

                        <TouchableOpacity style={styles.tableFooter}>
                            <Text style={styles.viewAllText}>View all Holdings</Text>
                            <ChevronDown color={COLORS.textMuted} size={14} />
                        </TouchableOpacity>
                    </View>
                </AccordionSection>



                <Riskometer />



                {/* Scheme Info */}
                <AccordionSection title="Scheme Info" defaultExpanded={false}>
                    <Text style={styles.schemeObjText}>
                        <Text style={{ fontWeight: 'bold', color: COLORS.black }}>Objective:</Text> To generate long-term capital growth from an actively managed portfolio primarily of equity and Equity Related Securities.
                    </Text>

                    <View style={styles.infoGrid}>
                        <InfoCell icon={<PieChart size={14} color="#6ea18a" />} title="Expense Ratio" value="1.15%" subValue="(inclusive of GST)" />
                        <InfoCell icon={<PieChart size={14} color="#6ea18a" />} title="AUM" value="₹1,26,285 Cr." />
                        <InfoCell icon={<Lock size={14} color="#6ea18a" />} title="Lock-in Period" value="Nil" />
                        <InfoCell icon={<FileCheck size={14} color="#6ea18a" />} title="Benchmark" value="S&P BSE PSU TR INR" />
                        <InfoCell icon={<RotateCw size={14} color="#6ea18a" />} title="Exit Load" value="Applicable" />
                        <InfoCell icon={<Calendar size={14} color="#6ea18a" />} title="Listing Date" value="1 Jan, 2022" />
                        <InfoCell icon={<Landmark size={14} color="#6ea18a" />} title="AMC" value="PPFAS Asset Management Pvt. Ltd." isFull />
                        <InfoCell icon={<Folder size={14} color="#6ea18a" />} title="RTA" value="CAMS" />
                        <InfoCell icon={<Contact size={14} color="#6ea18a" />} title="Contact Details" value="81/82, 8th Floor, Sakhar Bhavan, Ramnath Goenka Marg, 230, Nariman Point, Mumbai 400021\nTel no.: 022-61406555" isFull />
                    </View>
                </AccordionSection>



                {/* Fund Manager */}
                <AccordionSection title="Fund Manager" defaultExpanded={false}>
                    {[1, 2, 3, 4].map(idx => (
                        <View key={idx} style={styles.managerRow}>
                            <View style={styles.managerAvatar}><Text style={styles.avatarText}>RT</Text></View>
                            <View>
                                <Text style={styles.managerName}>Rajeev Thakkar,</Text>
                                <Text style={styles.managerSub}>Sept 2017 - Present | 7 years</Text>
                            </View>
                        </View>
                    ))}
                </AccordionSection>



                <ReturnCalculator />

            </ScrollView>

            {/* Sticky Bottom Toolbar */}
            <View style={styles.stickyFooter}>
                <View style={styles.footerCol}>
                    <Text style={styles.footerTopLabel}>Min One Time Amount</Text>
                    <Text style={styles.footerAmount}>₹ 5000</Text>
                    <TouchableOpacity style={styles.footerBtnLight}>
                        <Text style={styles.footerBtnLightText}>One Time</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerCol}>
                    <Text style={styles.footerTopLabel}>Min SIP Amount</Text>
                    <Text style={styles.footerAmount}>₹ 25/day</Text>
                    <TouchableOpacity style={styles.footerBtnDark}>
                        <Text style={styles.footerBtnDarkText}>Start SIP</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

// Component Helpers
const AnalyticsRow = ({ icon, title, subtitle }: any) => (
    <View style={styles.analyticRow}>
        <View style={styles.iconCircle}>{icon}</View>
        <View style={styles.analyticTexts}>
            <Text style={styles.analyticTitle}>{title}</Text>
            <Text style={styles.analyticSubtitle}>{subtitle}</Text>
        </View>
    </View>
);

const InfoCell = ({ icon, title, value, subValue, isFull }: any) => (
    <View style={[styles.infoCell, isFull && { width: '100%' }]}>
        <View style={styles.infoLabelRow}>
            {icon}
            <Text style={styles.infoLabel}>{title}</Text>
        </View>
        <Text style={styles.infoValue}>
            {value} {subValue && <Text style={styles.infoSubValue}>{subValue}</Text>}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f3f4f6',
    },
    topHeader: {
        backgroundColor: COLORS.primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        zIndex: 50,
        // Removed shadows so it merges with the greenBackdrop inside SchemeHeader
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        height: 60,
    },
    headerTitle: {
        color: COLORS.white,
        fontSize: FONT_SIZES.lg,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    backBtn: {
        padding: 2,
        marginLeft: -8,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    cartBtn: {
        padding: 2,
    },
    cartBadge: {
        position: 'absolute',
        top: -6,
        right: -8,
        backgroundColor: COLORS.white,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartBadgeText: {
        color: COLORS.primary,
        fontSize: 10,
        fontWeight: 'bold',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    sectionContainer: {
        backgroundColor: COLORS.white,
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f0f3f5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f3f5',
    },
    sectionContent: {
        paddingTop: 16,
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937', // Slightly softer header color
    },
    // Analytics
    analyticsList: {
        gap: 28,
    },
    analyticRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#ecfdf5',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#d1fae5',
    },
    boldChar: {
        color: '#059669',
        fontFamily: 'serif',
        fontWeight: 'bold',
        fontSize: 18,
    },
    analyticTexts: {
        flex: 1,
        paddingTop: 4,
    },
    analyticTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 2,
    },
    analyticSubtitle: {
        fontSize: 12,
        color: COLORS.textSecondary,
        lineHeight: 16,
    },
    // Allocation Tabs
    allocationTabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderColor: '#f3f4f6',
        marginBottom: 24,
    },
    allocTab: {
        paddingBottom: 10,
        paddingHorizontal: 16,
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textMuted,
    },
    allocTabActive: {
        color: COLORS.black,
        borderBottomWidth: 2,
        borderColor: COLORS.black,
    },
    // Table
    tableContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f3f4f6', // gray-100
        backgroundColor: COLORS.white,
    },
    tableHead: {
        flexDirection: 'row',
        backgroundColor: '#f9fafb',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    th: {
        color: COLORS.textMuted,
        fontSize: 11,
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    tr: {
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderColor: '#f9fafb',
    },
    td: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    tableFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        padding: 12,
        borderTopWidth: 1,
        borderColor: '#f9fafb',
    },
    viewAllText: {
        color: COLORS.textMuted,
        fontSize: 12,
        fontWeight: '500',
    },
    // Scheme Info
    schemeObjText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        lineHeight: 18,
        marginBottom: 24,
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 24,
    },
    infoCell: {
        width: '50%',
    },
    infoLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    infoLabel: {
        fontSize: 11,
        color: COLORS.textSecondary,
    },
    infoValue: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#111827',
        paddingLeft: 22, // Align under text
    },
    infoSubValue: {
        fontWeight: 'normal',
        fontSize: 10,
        color: COLORS.textSecondary,
    },
    // Managers
    managerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
        marginBottom: 24,
    },
    managerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#5d9cec',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    managerName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
    },
    managerSub: {
        fontSize: 11,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    // Sticky Footer
    stickyFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 32 : 24,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#f3f4f6',
        gap: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 20,
    },
    footerCol: {
        flex: 1,
    },
    footerTopLabel: {
        fontSize: 10,
        color: COLORS.textMuted,
        textAlign: 'center',
        marginBottom: 4,
    },
    footerAmount: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 8,
    },
    footerBtnLight: {
        backgroundColor: '#e6f2ed',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(92, 148, 121, 0.2)', // primary with opacity
    },
    footerBtnLightText: {
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: 'bold',
    },
    footerBtnDark: {
        backgroundColor: COLORS.primaryLight,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    footerBtnDarkText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: 'bold',
    }

});
