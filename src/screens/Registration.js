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

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('name')
    .required('Please enter a Name'),
  email: Yup.string()
    .label('email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('password')
    .required()
    .min(4, 'password must have at least 4 characters '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
    .label('phone')
    .required('Please enter a Phone Number'),
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

export default class Registration extends React.Component {


  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
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
          initialValues={{ name: '', email: '', password: '', confirmPassword: '', phone: '', check: false, gender: '', city: '', skills: '' }}
          onSubmit={values => { alert(JSON.stringify(values)) }}
          validationSchema={validationSchema}
        >
          {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched,
            handleBlur, setFieldValue }) => (
              <Fragment>
                <ScrollView>

                  <FormInput
                    name='name'
                    value={values.name}
                    onChangeText={handleChange('name')}
                    placeholder='Enter Name'
                    autoCapitalize='none'
                    //iconName='envelope'
                    //iconColor='#2C384A'
                    onBlur={handleBlur('name')}
                  />
                  <ErrorMessage errorValue={touched.name && errors.name} />

                  <FormInput
                    name='email'
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder='Enter email'
                    autoCapitalize='none'
                    iconName='envelope'
                    iconColor='#2C384A'
                    onBlur={handleBlur('email')}
                  />
                  <ErrorMessage errorValue={touched.email && errors.email} />

                  <FormInput
                    name='password'
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder='Enter password'
                    secureTextEntry
                    // iconName='ios-lock'
                    // iconColor='#2C384A'
                    onBlur={handleBlur('password')}
                  />
                  <ErrorMessage errorValue={touched.password && errors.password} />

                  <FormInput
                    name='confirmPassword'
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    placeholder='Enter Confirm Password'
                    secureTextEntry
                    // iconName='ios-lock'
                    // iconColor='#2C384A'
                    onBlur={handleBlur('confirmPassword')}
                  />
                  <ErrorMessage errorValue={touched.confirmPassword && errors.confirmPassword} />

                  <FormInput
                    name='phone'
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    placeholder='Enter Phone Number'
                    secureTextEntry
                    // iconName='ios-lock'
                    // iconColor='#2C384A'
                    onBlur={handleBlur('phone')}
                  />
                  <ErrorMessage errorValue={touched.phone && errors.phone} />

                  <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, padding: 15, }}>
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

                  <View style={styles.selectBox}>
                    <Text > Select City</Text>
                    <Picker
                      selectedValue={this.state.language}
                      style={{ flex: 1, padding: 20 }}
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
                  </View>

                  <View style={{ flex: 1, padding: 20 }}>
                    <Text > Select Gender</Text>
                    <RadioGroup
                      onSelect={(index, value) => setFieldValue('gender', value)}
                      onBlur={handleBlur('gender')}
                      style={{ flex: 1, padding: 20, flexDirection: 'row' }}
                    >
                      <RadioButton value={'male'} >
                        <Text>Male</Text>
                      </RadioButton>
                      <RadioButton value={'female'}>
                        <Text>Female</Text>
                      </RadioButton>
                    </RadioGroup>
                    <ErrorMessage errorValue={touched.gender && errors.gender} />
                  </View>

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

                  <View style={styles.buttonContainer}>
                    <FormButton
                      buttonType='outline'
                      onPress={handleSubmit}
                      title='REGISTRATION'
                      buttonColor='#039BE5'
                      disabled={!isValid || isSubmitting}
                    />
                  </View>
                </ScrollView>
              </Fragment>
            )
          }
        </Formik>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25,
    margin:15
  },
  buttonContainer: {
    margin: 5
  },
  selectBox: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    padding: 15
  },
  checkBoxContainer:{
    //padding:5
    margin:10
  }
})