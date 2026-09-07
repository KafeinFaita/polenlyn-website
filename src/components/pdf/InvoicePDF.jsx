import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#1e293b',
    backgroundColor: '#ffffff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  companyName: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  invoiceTitle: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  subText: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 2,
  },
  metaSection: {
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  metaLabel: {
    width: 80,
    fontFamily: 'Helvetica-Bold',
  },
  billToSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  // Table Styles
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 25,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    minHeight: 24,
    alignItems: 'center',
  },
  tableHeader: {
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#ffffff',
  },
  colDesc: {
    width: '65%',
    borderRightWidth: 1,
    borderRightColor: '#000000',
    paddingLeft: 8,
    paddingRight: 8,
  },
  colAmount: {
    width: '35%',
    paddingLeft: 8,
    paddingRight: 8,
  },
  totalRow: {
    fontFamily: 'Helvetica-Bold',
  },
  // Payment Info
  paymentSection: {
    marginBottom: 30,
    lineHeight: 1.4,
  },
  closingText: {
    marginBottom: 40,
  },
  // Signature Block
  signatureBlock: {
    marginTop: 20,
    lineHeight: 1.3,
  },
  signName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: '#0f172a',
  }
});

export default function InvoicePDF({ data }) {
  const {
    invoiceNo = '2026-033',
    invoiceDate = '08/05/2026',
    clientName = 'Client Name / Business Name here',
    clientAddress = ['Client Address Line 1', 'Line 2', 'Line 3 if necessary'],
    items = [
      { description: 'Domain Registration Renewal', amount: 'PHP 4,500' },
      { description: 'Email Registration and Configuration Renewal', amount: 'PHP 5,000' },
      { description: 'Service and Maintenance Fee', amount: 'PHP 3,500' },
    ],
    totalAmount = 'PHP 13,000 (Thirteen Thousand Pesos)',
    paymentDetails = [
      'Bank Account #1 No',
      'Account Name',
      '',
      'Bank Account # 2 if necessary'
    ],
    issuer = {
      name: 'Lynyrd Andres',
      position: 'Business position here, Polenlyn IT Solutions',
      contact: 'contact number here | email here'
    }
  } = data || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.companyName}>Polenlyn Solutions</Text>
            <Text style={styles.subText}>Business Address Here</Text>
          </View>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
        </View>

        {/* Invoice Meta */}
        <View style={styles.metaSection}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Invoice #</Text>
            <Text>{invoiceNo}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Invoice Date</Text>
            <Text>{invoiceDate}</Text>
          </View>
        </View>

        {/* Bill To */}
        <View style={styles.billToSection}>
          <Text style={styles.sectionTitle}>Bill To: {clientName}</Text>
          {clientAddress.map((line, idx) => (
            <Text key={idx}>{line}</Text>
          ))}
        </View>

        {/* Table Details */}
        <Text style={[styles.sectionTitle, { marginBottom: 6 }]}>Details:</Text>
        <View style={styles.table}>
          
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.colDesc}>
              <Text style={{ textAlign: 'center', fontFamily: 'Helvetica-Bold' }}>Description</Text>
            </View>
            <View style={styles.colAmount}>
              <Text style={{ textAlign: 'center', fontFamily: 'Helvetica-Bold' }}>Amount</Text>
            </View>
          </View>

          {/* Line Items */}
          {items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.colDesc}>
                <Text>{item.description}</Text>
              </View>
              <View style={styles.colAmount}>
                <Text>{item.amount}</Text>
              </View>
            </View>
          ))}

          {/* Blank Spacer Row (matching physical format) */}
          <View style={styles.tableRow}>
            <View style={styles.colDesc}><Text> </Text></View>
            <View style={styles.colAmount}><Text> </Text></View>
          </View>

          {/* Total Row */}
          <View style={[styles.tableRow, styles.totalRow, { borderBottomWidth: 0 }]}>
            <View style={styles.colDesc}>
              <Text>Total Amount</Text>
            </View>
            <View style={styles.colAmount}>
              <Text>{totalAmount}</Text>
            </View>
          </View>

        </View>

        {/* Payment Instructions */}
        <View style={styles.paymentSection}>
          <Text style={{ marginBottom: 6 }}>You may send your payment to:</Text>
          {paymentDetails.map((detail, idx) => (
            <Text key={idx}>{detail}</Text>
          ))}
        </View>

        {/* Closing Note */}
        <Text style={styles.closingText}>Thank you for entrusting your corporate concerns with us.</Text>

        {/* Signature & Issuer Info */}
        <View style={styles.signatureBlock}>
          <Text style={{ color: '#64748b', marginBottom: 12 }}>Digital Sig goes here</Text>
          <Text style={styles.signName}>{issuer.name}</Text>
          <Text>{issuer.position}</Text>
          <Text>{issuer.contact}</Text>
        </View>

      </Page>
    </Document>
  );
}