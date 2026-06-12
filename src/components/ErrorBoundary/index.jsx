import { Component } from 'react'
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import logger from '@utils/logger'
import i18n from '../../i18n/i18n'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    logger.error('React ErrorBoundary caught an error', {
      error: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
    })
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100vh"
          w="100vw"
          bg="gray.900"
          p={8}
        >
          <VStack spacing={4} textAlign="center">
            <Heading color="red.300" size="lg">
              {i18n.t('error.somethingWrong')}
            </Heading>
            <Text color="gray.300" fontSize="sm" maxW="400px">
              {i18n.t('error.unexpectedError')}
            </Text>
            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <Text color="red.200" fontSize="xs" maxW="600px" noOfLines={5}>
                {this.state.error.message}
              </Text>
            )}
            <VStack spacing={2}>
              <Button colorScheme="blue" onClick={this.handleRetry}>
                {i18n.t('error.tryAgain')}
              </Button>
              <Button variant="outline" colorScheme="gray" onClick={this.handleReload}>
                {i18n.t('error.reloadPage')}
              </Button>
            </VStack>
          </VStack>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
