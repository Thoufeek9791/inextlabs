'use client';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    text: 'Inflow DocsAI transformed the way we handle internal knowledge sharing. The search is lightning fast and incredibly accurate.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'David Kim',
    role: 'CTO',
    text: 'Our support team reduced ticket resolution time by 40%. DocsAI just works.',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    name: 'Emily Carter',
    role: 'Tech Lead',
    text: 'The integration was seamless, and adoption was instant. The UI/UX is just beautiful.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Michael Green',
    role: 'Engineering Manager',
    text: 'We rolled this out to 500+ employees and the feedback has been amazing.',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
  {
    name: 'Laura García',
    role: 'Compliance Officer',
    text: 'Audits are so much smoother now. Everything is structured and easy to access.',
    image: 'https://randomuser.me/api/portraits/women/50.jpg',
  },
  {
    name: 'David Wilson',
    role: 'CEO',
    text: 'DocsAI has elevated our operations to the next level. Truly innovative technology.',
    image: 'https://randomuser.me/api/portraits/men/55.jpg',
  },
];

export function Testimonials() {
  return (
    <section className="relative bg-gray-50 px-4 py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-3xl font-bold text-gray-900 dark:text-white"
        >
          Loved by Teams Worldwide
        </motion.h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="flex h-full flex-col justify-between rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800"
              >
                <div>
                  <img
                    src={t.image}
                    alt={t.name}
                    className="mx-auto mb-4 h-20 w-20 rounded-full border-4 border-indigo-500 shadow-md"
                  />
                  <p className="mb-6 text-gray-600 italic dark:text-gray-300">“{t.text}”</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t.name}</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{t.role}</span>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
