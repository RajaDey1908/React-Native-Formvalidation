//import {React, Fragment} from 'react'
import React, { Component, Fragment } from 'react'
import { StyleSheet, SafeAreaView, View, Text, ScrollView, Picker } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'
import MultiSelect from 'react-native-multiple-select';

//import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'

let radio_props = [
  { label: 'Male', value: 0 },
  { label: 'Female', value: 0 }
];

const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
]

const items = [
  { id: '1', name: 'America' },
  { id: '2', name: 'Argentina' },
  { id: '3', name: 'Armenia' },
  { id: '4', name: 'Australia' },
  { id: '5', name: 'Austria' },
  { id: '6', name: 'Azerbaijan' },
  { id: '7', name: 'Argentina' },
  { id: '8', name: 'Belarus' },
  { id: '9', name: 'Belgium' },
  { id: '10', name: 'Brazil' },
];

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(4, 'Password must have at least 4 characters '),
  check: Yup.boolean().oneOf([true], 'Please check the agreement'),
  gender: Yup.string()
    .label('gender')
    .required('Please Select Gender'),
  city: Yup.string()
    .label('city')
    .required('Please Select city'),
  skills: Yup.string()
    .label('skills')
    .required('Please Select Skills'),
})


//import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
export default class Registration extends React.Component {


  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      gender: '',
      skills: [],
    }
  }

  onSelectedItemsChange = skills => {
    this.setState({ skills });
    //Set Selected Items
  };

  onLogin = async () => {
    const { email, password } = this.state
    try {
      if (email.length > 0 && password.length > 0) {
        this.props.navigation.navigate('App')
      }
    } catch (error) {
      alert(error)
    }
  }

  goToSignup = () => this.props.navigation.navigate('Signup')
  render() {
    const { skills } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{ email: '', password: '', check: false, gender: '', city: '', skills: '' }}
          onSubmit={values => { alert(JSON.stringify(values)) }}
          validationSchema={validationSchema}
        >
          {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched,
            handleBlur, setFieldValue }) => (
              <Fragment>
                <ScrollView>
                  <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, padding: 30 }}>
                      <MultiSelect
                        name='skills'
                        hideTags
                        items={items}
                        uniqueKey="id"
                        ref={component => {
                          this.multiSelect = component;
                        }}
                        onSelectedItemsChange={skills => {
                          this.setState({ skills });
                          setFieldValue('skills', skills)
                        }}
                        selectedItems={skills}
                        selectText="Pick Skills"
                        searchInputPlaceholderText="Search Items..."
                        onChangeInput={text => console.log(text)}
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#48d22b"
                        submitButtonText="Select Complete"
                      />
                    </View>
                  </SafeAreaView>
                  <ErrorMessage errorValue={touched.skills && errors.skills} />
                  
                  <FormInput
                    name='email'
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder='Enter email'
                    autoCapitalize='none'
                    iconName='envelope'
                    //iconColor='#2C384A'
                    onBlur={handleBlur('email')}
                  />
                  <ErrorMessage errorValue={touched.email && errors.email} />
                  <FormInput
                    name='password'
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder='Enter password'
                    secureTextEntry
                    iconName='ios-lock'
                    iconColor='#2C384A'
                    onBlur={handleBlur('password')}
                  />
                  <ErrorMessage errorValue={touched.password && errors.password} />
                  <CheckBox
                    containerStyle={styles.checkBoxContainer}
                    checkedIcon="check-box"
                    iconType="material"
                    uncheckedIcon="check-box-outline-blank"
                    title="Agree to terms and conditions"
                    checkedTitle="You agreed to our terms and conditions"
                    checked={values.check}
                    onPress={() => setFieldValue('check', !values.check)}
                  />
                  <ErrorMessage errorValue={touched.check && errors.check} />

                  <RadioGroup
                    onSelect={(index, value) => setFieldValue('gender', value)}
                    onBlur={handleBlur('gender')}
                  >
                    <RadioButton value={'male'} >
                      <Text>Male</Text>
                    </RadioButton>
                    <RadioButton value={'female'}>
                      <Text>Female</Text>
                    </RadioButton>
                  </RadioGroup>
                  <ErrorMessage errorValue={touched.gender && errors.gender} />

                  <Text> Select City</Text>
                  <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => {
                      setFieldValue('city', itemValue)
                      this.setState({ language: itemValue })
                    }}>
                    <Picker.Item label=" " value=" " />
                    <Picker.Item label="Kolkata" value="kolkata" />
                    <Picker.Item label="Delhi" value="delhi" />
                    <Picker.Item label="Mumbai" value="mumbai" />
                  </Picker>
                  <ErrorMessage errorValue={touched.city && errors.city} />



                  <View style={styles.buttonContainer}>
                    <FormButton
                      buttonType='outline'
                      onPress={handleSubmit}
                      title='LOGIN'
                      buttonColor='#039BE5'
                      disabled={!isValid || isSubmitting}
                    />
                  </View>
                </ScrollView>
              </Fragment>
            )
          }
        </Formik>
        <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToSignup}
          titleStyle={{
            color: '#F57C00'
          }}
          type="clear"
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    margin: 25
  }
})