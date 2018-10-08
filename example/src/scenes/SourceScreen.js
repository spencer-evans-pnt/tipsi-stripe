import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import stripe from 'tipsi-stripe'
import Button from '../components/Button'
import testID from '../utils/testID'

/* eslint-disable no-console */
export default class SourceScreen extends PureComponent {
  static title = 'Sources'

  state = {
    loading: false,
    source: null,
    error: null
  }

  handleCreateCardSourcePress = async () => {
    try {
      this.setState({ loading: true, source: null, error: null })

      const source = await stripe.createSourceWithParams({
        type: 'card',
        currency: 'USD',
        name: 'Joe Shmo',
        
        //number: '1111424242424242',
        number: '4242424242424242',
        expMonth: 1,
        expYear: 2020,
        cvc: '123',

        addressLine1: '308 SW 6th St',
        addressLine2: '',
        addressCity: 'Bentonville',
        addressState: 'AR',
        addressCountry: 'USA',
        addressZip: '72712',
      })
      this.setState({ loading: false, source })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  render() {
    const { loading, source, error } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Source Example
        </Text>
        <Text style={styles.instruction}>
          Click button to create a source.
        </Text>
        <Button
          text="Create source for CARD payment"
          loading={loading}
          onPress={this.handleCreateCardSourcePress}
          {...testID('sourceButton')}
        />
        <View style={styles.source} {...testID('sourceObject')}>
          {source &&
            <Text style={styles.instruction}>
              Source: {JSON.stringify(source)}
            </Text>
          }
          {error &&
            <Text style={styles.instruction}>
              Error: {JSON.stringify(error)}
            </Text>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  source: {
    width: '100%',
    height: 120,
  },
})
