import assert from 'node:assert/strict'
import test from 'node:test'

import { contactRepository } from '../app/core/infrastructure/repositories/contact.repository.js'
import { FeedbackSubmission } from '../app/core/domain/models/feedback.model.js'
import { feedbackRepository } from '../app/core/infrastructure/repositories/feedback.repository.js'
import { recruitmentRepository } from '../app/core/infrastructure/repositories/recruitment.repository.js'
import { bookingRepository } from '../app/core/infrastructure/repositories/booking.repository.js'

const calls = []

globalThis.useAxios = () => ({
  post: async (url, payload) => {
    calls.push({ url, payload })
    return { data: 123 }
  },
})

test('support form submits to the Management support-request inbox contract', async () => {
  calls.length = 0

  const result = await contactRepository.submitContact({
    fullName: 'Nguyen Van A',
    phone: '0909123456',
    email: 'customer@example.com',
    subject: 'Tu van mua xe',
    message: 'Can tu van xe moi',
  })

  assert.deepEqual(calls, [
    {
      url: '/api/v1/Contacts/support-request',
      payload: {
        request: {
          fullName: 'Nguyen Van A',
          phoneNumber: '0909123456',
          email: 'customer@example.com',
          subject: 'Tu van mua xe',
          category: 'Sales',
          content: 'Can tu van xe moi',
        },
      },
    },
  ])
  assert.deepEqual(result, {
    success: true,
    id: 123,
    message: 'Gửi yêu cầu hỗ trợ thành công.',
  })
})

test('test-drive and service appointments share the Marketing booking inbox contract', async () => {
  calls.length = 0

  const testDrive = {
    bookingType: 'TestDrive',
    customerName: 'Nguyen Van A',
    customerPhone: '0909123456',
    preferredDate: '2026-07-20',
  }
  const maintenance = {
    bookingType: 'Maintenance',
    customerName: 'Tran Thi B',
    customerPhone: '0911222333',
    preferredDate: '2026-07-21',
  }

  await bookingRepository.createBooking(testDrive)
  await bookingRepository.createBooking(maintenance)

  assert.deepEqual(calls, [
    { url: '/api/v1/Bookings', payload: testDrive },
    { url: '/api/v1/Bookings', payload: maintenance },
  ])
})

test('feedback form maps storefront fields to the Management feedback inbox contract', () => {
  const payload = new FeedbackSubmission({
    fullName: 'Tran Thi B',
    phone: '0911222333',
    email: 'feedback@example.com',
    subject: 'Dich vu',
    message: 'Nhan vien tu van tot',
    rating: 4,
  }).toContactPayload()

  assert.deepEqual(payload, {
    rating: 4,
    feedbackArea: 'Dich vu',
    customerName: 'Tran Thi B',
    phoneNumber: '0911222333',
    content: 'Nhan vien tu van tot',
  })
})

test('feedback repository posts to the feedback endpoint with the command wrapper', async () => {
  calls.length = 0

  const result = await feedbackRepository.submitFeedback({
    rating: 5,
    feedbackArea: 'Showroom',
    customerName: 'Le Van C',
    phoneNumber: '0988777666',
    content: 'Khong gian dep',
  })

  assert.deepEqual(calls, [
    {
      url: '/api/v1/Contacts/feedback',
      payload: {
        request: {
          rating: 5,
          feedbackArea: 'Showroom',
          customerName: 'Le Van C',
          phoneNumber: '0988777666',
          content: 'Khong gian dep',
        },
      },
    },
  ])
  assert.deepEqual(result, {
    success: true,
    id: 123,
    message: 'Gửi góp ý thành công.',
  })
})

test('recruitment applications post to the candidate inbox contract', async () => {
  calls.length = 0

  const result = await recruitmentRepository.submitApplication({
    name: 'Pham Van D',
    phone: '0977000111',
    email: 'candidate@example.com',
    position: 'Ky thuat vien',
    message: 'Co 2 nam kinh nghiem',
    cvFileUrl: '',
  })

  assert.deepEqual(calls, [
    {
      url: '/api/v1/Contacts/job-application',
      payload: {
        request: {
          fullName: 'Pham Van D',
          email: 'candidate@example.com',
          phoneNumber: '0977000111',
          appliedPosition: 'Ky thuat vien',
          cvFileUrl: '',
          coverLetter: 'Co 2 nam kinh nghiem',
        },
      },
    },
  ])
  assert.deepEqual(result, {
    success: true,
    id: 123,
    message: 'Gửi hồ sơ ứng viên thành công.',
  })
})
