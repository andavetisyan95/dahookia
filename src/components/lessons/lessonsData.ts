export interface LessonType {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  isPopular?: boolean;
  originalPrice?: string;
  discount?: string;
}

export interface LessonCategory {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  types: LessonType[];
}

export const skiLessons: LessonCategory = {
  id: 'ski-lessons',
  title: 'Ski Lessons',
  description: '**WHAT LEVEL ARE YOU?**\n\nWhether you\'re strapping on your skis for the first time or the slopes are your second home, we\'ve got ski lessons to help you learn to ski level up your snow game.',
  imageSrc: '/services/skilesson.jpg',
  imageAlt: 'Ski lesson in progress',
  types: [
    {
      id: 'ski-single',
      title: 'Single Lesson',
      price: '$99',
      duration: '2 hours',
      description: 'Perfect for trying out or focusing on specific skills',
      features: [
        'Personalized instruction',
        '2 hours of training',
        'All skill levels',
        'Flexible scheduling'
      ]
    },
    {
      id: 'ski-starter',
      title: 'Starter Pack',
      price: '$270',
      duration: '3 x 2 hours',
      description: 'Great way to build your skills progressively',
      features: [
        '3 private lessons',
        'Save 10% vs single lessons',
        'Personalized progress tracking',
        'Priority booking'
      ],
      originalPrice: '$297',
      discount: 'Save 10%',
      isPopular: true
    },
    {
      id: 'ski-extended',
      title: 'Extended Learning',
      price: '$400',
      duration: '5 x 2 hours',
      description: 'Best value for comprehensive learning',
      features: [
        '5 private lessons',
        'Save 20% vs single lessons',
        'Video analysis included',
        'Flexible scheduling'
      ],
      originalPrice: '$495',
      discount: 'Save 20%'
    },
    {
      id: 'ski-fullday',
      title: 'Full Day Plan',
      price: '$350',
      duration: '6 hours',
      description: 'Ideal for intensive training',
      features: [
        'Full day instruction',
        'Lunch with instructor',
        'Mountain tour included',
        'Video analysis'
      ]
    },
    {
      id: 'ski-vip',
      title: 'VIP Package',
      price: '$600',
      duration: '8 hours',
      description: 'Ultimate personalized experience',
      features: [
        'Full day private instruction',
        'Priority lift access',
        'Video analysis',
        'Gear setup assistance',
        'Flexible start time'
      ]
    }
  ]
};

export const snowboardLessons: LessonCategory = {
  id: 'snowboard-lessons',
  title: 'Snowboard Lessons',
  description: '**WHAT LEVEL ARE YOU?**\n\nWhether you\'re strapping on your snowboard for the first time or the slopes are your second home, we\'ve got lessons to help you level up your snow game.',
  imageSrc: '/services/boardlesson.jpg',
  imageAlt: 'Snowboard lesson in progress',
  types: [
    {
      id: 'snow-single',
      title: 'Single Lesson',
      price: '$99',
      duration: '2 hours',
      description: 'Perfect for trying out or focusing on specific skills',
      features: [
        'Personalized instruction',
        '2 hours of training',
        'All skill levels',
        'Flexible scheduling'
      ]
    },
    {
      id: 'snow-starter',
      title: 'Starter Pack',
      price: '$270',
      duration: '3 x 2 hours',
      description: 'Great way to build your skills progressively',
      features: [
        '3 private lessons',
        'Save 10% vs single lessons',
        'Personalized progress tracking',
        'Priority booking'
      ],
      originalPrice: '$297',
      discount: 'Save 10%',
      isPopular: true
    },
    {
      id: 'snow-extended',
      title: 'Extended Learning',
      price: '$400',
      duration: '5 x 2 hours',
      description: 'Best value for comprehensive learning',
      features: [
        '5 private lessons',
        'Save 20% vs single lessons',
        'Video analysis included',
        'Flexible scheduling'
      ],
      originalPrice: '$495',
      discount: 'Save 20%'
    },
    {
      id: 'snow-fullday',
      title: 'Full Day Plan',
      price: '$350',
      duration: '6 hours',
      description: 'Ideal for intensive training',
      features: [
        'Full day instruction',
        'Lunch with instructor',
        'Mountain tour included',
        'Video analysis'
      ]
    },
    {
      id: 'snow-vip',
      title: 'VIP Package',
      price: '$600',
      duration: '8 hours',
      description: 'Ultimate personalized experience',
      features: [
        'Full day private instruction',
        'Priority lift access',
        'Video analysis',
        'Gear setup assistance',
        'Flexible start time'
      ]
    }
  ]
};

export const lessons = [skiLessons, snowboardLessons];

export default lessons;
