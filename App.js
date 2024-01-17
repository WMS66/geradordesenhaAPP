import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Clipboard,
    Switch,
} from 'react-native'

import styles from './assets/style/App'

const App = () => {
    const [password, setPassword] = useState('')
    const [passwordLength, setPasswordLength] = useState('21')
    const [useSymbols, setUseSymbols] = useState(true)
    const [useNumbers, setUseNumbers] = useState(true)
    const [useLowerCase, setUseLowerCase] = useState(true)
    const [useUpperCase, setUseUpperCase] = useState(true)
    const [successMessage, setSuccessMessage] = useState('')

    const generatePassword = () => {
        let charset = ''
        let newPassword = ''

        if (useSymbols) charset += '!@#$%^&*()'
        if (useNumbers) charset += '0123456789'
        if (useLowerCase) charset += 'abcdefghijklmnopqrstuvwxyz'
        if (useUpperCase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

        for (let i = 0; i < parseInt(passwordLength); i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
        }

        setPassword(newPassword)
    }

    const copyToClipboard = () => {
        Clipboard.setString(password)
        setSuccessMessage('Senha copiada para a área de transferência!')
        setTimeout(() => setSuccessMessage(''), 2000)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Gerador de Senha</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tamanho da Senha:</Text>
                <TextInput
                    keyboardType="numeric"
                    value={passwordLength}
                    onChangeText={(text) => setPasswordLength(text)}
                    style={styles.input}
                />
            </View>

            <View style={styles.checkbox}>
                <Switch value={useSymbols} onValueChange={() => setUseSymbols(!useSymbols)} />
                <Text style={styles.checkboxLabel}>Símbolos</Text>
            </View>

            <View style={styles.checkbox}>
                <Switch value={useNumbers} onValueChange={() => setUseNumbers(!useNumbers)} />
                <Text style={styles.checkboxLabel}>Números</Text>
            </View>

            <View style={styles.checkbox}>
                <Switch value={useLowerCase} onValueChange={() => setUseLowerCase(!useLowerCase)} />
                <Text style={styles.checkboxLabel}>Minúsculas</Text>
            </View>

            <View style={styles.checkbox}>
                <Switch value={useUpperCase} onValueChange={() => setUseUpperCase(!useUpperCase)} />
                <Text style={styles.checkboxLabel}>Maiúsculas</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={generatePassword}>
                <Text style={styles.buttonText}>Gerar Senha</Text>
            </TouchableOpacity>

            {password !== '' && (
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Senha Gerada:</Text>
                    <TextInput value={password} style={styles.input} />
                    <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                        <Text style={styles.buttonText}>Copiar</Text>
                    </TouchableOpacity>
                </View>
            )}

            {successMessage !== '' && <Text style={styles.successMessage}>{successMessage}</Text>}
        </View>
    )
}

export default App
