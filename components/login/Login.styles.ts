import { StyleSheet } from 'react-native';

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: colors.background,
    },
    form: {
      width: '100%',
      maxWidth: 400,
      alignSelf: 'center',
      padding: 16,
      backgroundColor: colors.formBackground,
      borderRadius: 8,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.textPrimary,
    },
    input: {
      height: 48,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 12,
      backgroundColor: colors.inputBackground,
      color: colors.textInput, // Set text color for input fields
    },
    button: {
      backgroundColor: colors.buttonBackground,
      paddingVertical: 14,
      borderRadius: 8,
      marginBottom: 16,
      alignItems: 'center',
    },
    buttonText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    link: {
      color: colors.linkColor,
      fontSize: 16,
      textAlign: 'center',
      marginVertical: 8,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,
    },
    linkContainer: {
      flex: 1,
      alignItems: 'center',
    },
  });

export default createStyles;