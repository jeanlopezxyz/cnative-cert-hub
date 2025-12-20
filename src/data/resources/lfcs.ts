/**
 * LFCS - Linux Foundation Certified System Administrator
 * Study Resources - Updated December 2024
 */

import type { CertificationResources } from '../../types';

export const lfcsResources: CertificationResources = {
  official: 'https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/',
  github: [
    'https://github.com/simonesavi/lfcs',
    'https://github.com/Bes0n/LFCS',
  ],
  practice: [
    // Note: Practice resources are documented in tools and courses arrays with full metadata
  ],

  books: [
    {
      title: 'The Linux Command Line, 2nd Edition',
      url: 'https://linuxcommand.org/tlcl.php',
      author: 'William Shotts',
      description: 'Comprehensive guide to the Linux command line (Free)',
      isPaid: false,
      format: 'pdf',
      year: 2019,
      difficulty: 'beginner',
    },
    {
      title: 'Linux Bible, 10th Edition',
      url: 'https://www.wiley.com/en-us/Linux+Bible%2C+10th+Edition-p-9781119578895',
      author: 'Christopher Negus',
      description: 'Comprehensive Linux administration guide',
      isPaid: true,
      format: 'paperback',
      year: 2020,
      difficulty: 'beginner',
    },
    {
      title: 'UNIX and Linux System Administration Handbook, 5th Edition',
      url: 'https://www.oreilly.com/library/view/unix-and-linux/9780134278308/',
      author: 'Evi Nemeth, Garth Snyder, Trent R. Hein, Ben Whaley, Dan Mackin',
      description: 'Definitive guide to system administration',
      isPaid: true,
      format: 'paperback',
      year: 2017,
      difficulty: 'intermediate',
    },
    {
      title: 'How Linux Works, 3rd Edition',
      url: 'https://nostarch.com/howlinuxworks3',
      author: 'Brian Ward',
      description: 'What every superuser should know',
      isPaid: true,
      format: 'paperback',
      year: 2021,
      difficulty: 'intermediate',
    },
  ],

  courses: [
    {
      title: 'Linux System Administration Essentials (LFS207)',
      url: 'https://training.linuxfoundation.org/training/linux-system-administration-essentials-lfs207/',
      author: 'The Linux Foundation',
      description: 'Official LFCS preparation course',
      isPaid: true,
      duration: '40 hours',
      difficulty: 'intermediate',
      rating: 4.8,
    },
    {
      title: 'LFCS Certification Course',
      url: 'https://kodekloud.com/courses/linux-foundation-certified-system-administrator-lfcs/',
      author: 'KodeKloud',
      description: 'Complete LFCS preparation with hands-on labs',
      isPaid: true,
      duration: '25 hours',
      difficulty: 'intermediate',
      rating: 4.9,
    },
    {
      title: 'Introduction to Linux (LFS101)',
      url: 'https://training.linuxfoundation.org/training/introduction-to-linux/',
      author: 'The Linux Foundation',
      description: 'Develop a good working knowledge of Linux using both GUI and command line',
      isPaid: false,
      duration: '40-60 hours',
      difficulty: 'beginner',
      rating: 4.8,
    },
    {
      title: "A Beginner's Guide to Linux Kernel Development (LFD103)",
      url: 'https://training.linuxfoundation.org/training/a-beginners-guide-to-linux-kernel-development-lfd103/',
      author: 'The Linux Foundation',
      description: 'Learn how to become a Linux kernel developer',
      isPaid: false,
      duration: '12-16 hours',
      difficulty: 'intermediate',
      rating: 4.7,
    },
    {
      title: 'Linux Tools for Software Development (LFD108x)',
      url: 'https://training.linuxfoundation.org/training/linux-tools-for-software-development-lfd108x/',
      author: 'The Linux Foundation',
      description: 'Learn essential Linux tools for software development',
      isPaid: false,
      duration: '20-25 hours',
      difficulty: 'beginner',
      rating: 4.6,
    },
    {
      title: 'Git for Distributed Software Development (LFD109x)',
      url: 'https://training.linuxfoundation.org/training/git-for-distributed-software-development-lfd109x/',
      author: 'The Linux Foundation',
      description: 'Master Git for collaborative software development',
      isPaid: false,
      duration: '20-25 hours',
      difficulty: 'beginner',
      rating: 4.7,
    },
    {
      title: 'Linux Administration Bootcamp',
      url: 'https://www.udemy.com/course/linux-administration-bootcamp/',
      author: 'Jason Cannon',
      description: 'Linux administration fundamentals',
      isPaid: true,
      duration: '18 hours',
      difficulty: 'beginner',
      rating: 4.6,
    },
  ],

  videos: [
    {
      title: 'Linux for Beginners Full Course',
      url: 'https://www.youtube.com/watch?v=sWbUDq4S6Y8',
      author: 'FreeCodeCamp',
      description: 'Complete Linux course for beginners',
      isPaid: false,
      duration: '5 hours',
      difficulty: 'beginner',
    },
    {
      title: 'Linux System Administration',
      url: 'https://www.youtube.com/watch?v=wBp0Rb-ZJak',
      author: 'TechWorld with Nana',
      description: 'Linux sysadmin fundamentals',
      isPaid: false,
      duration: '2 hours',
      difficulty: 'intermediate',
    },
    {
      title: 'LFCS Exam Preparation',
      url: 'https://www.youtube.com/watch?v=kQNXKhxJx0E',
      author: 'Learn Linux TV',
      description: 'LFCS exam tips and preparation',
      isPaid: false,
      duration: '1.5 hours',
      difficulty: 'intermediate',
    },
  ],

  documentation: [
    {
      title: 'Linux Man Pages',
      url: 'https://man7.org/linux/man-pages/',
      description: 'Linux manual pages - essential reference',
      isPaid: false,
    },
    {
      title: 'LFCS Exam Domains',
      url: 'https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/',
      description: 'Official LFCS exam domains and objectives',
      isPaid: false,
    },
    {
      title: 'Red Hat Documentation',
      url: 'https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/',
      description: 'RHEL documentation (applicable to CentOS/Rocky)',
      isPaid: false,
    },
    {
      title: 'Ubuntu Documentation',
      url: 'https://help.ubuntu.com/',
      description: 'Ubuntu server documentation',
      isPaid: false,
    },
  ],

  blogs: [
    {
      title: 'LFCS Exam Study Guide',
      url: 'https://devopscube.com/lfcs-exam-guide/',
      author: 'DevOpsCube',
      description: 'Comprehensive LFCS study guide',
      isPaid: false,
    },
    {
      title: 'Linux Journey',
      url: 'https://linuxjourney.com/',
      author: 'Linux Journey',
      description: 'Interactive Linux learning path',
      isPaid: false,
    },
    {
      title: 'Linux Handbook',
      url: 'https://linuxhandbook.com/',
      author: 'Linux Handbook',
      description: 'Linux tutorials and guides',
      isPaid: false,
    },
  ],

  communities: [
    {
      title: 'r/linux Reddit',
      url: 'https://www.reddit.com/r/linux/',
      description: 'Linux community on Reddit',
      isPaid: false,
    },
    {
      title: 'r/linuxadmin Reddit',
      url: 'https://www.reddit.com/r/linuxadmin/',
      description: 'Linux administration community',
      isPaid: false,
    },
    {
      title: 'Linux Questions',
      url: 'https://www.linuxquestions.org/',
      description: 'Linux community forum',
      isPaid: false,
    },
    {
      title: 'Unix & Linux Stack Exchange',
      url: 'https://unix.stackexchange.com/',
      description: 'Q&A for Unix and Linux',
      isPaid: false,
    },
  ],

  tools: [
    {
      title: 'Killer.sh LFCS Simulator',
      url: 'https://killer.sh/',
      description: 'LFCS exam simulator',
      isPaid: true,
    },
    {
      title: 'VirtualBox',
      url: 'https://www.virtualbox.org/',
      description: 'Virtual machine for Linux practice',
      isPaid: false,
    },
    {
      title: 'Vagrant',
      url: 'https://www.vagrantup.com/',
      description: 'Development environments',
      isPaid: false,
    },
    {
      title: 'WSL (Windows Subsystem for Linux)',
      url: 'https://docs.microsoft.com/en-us/windows/wsl/',
      description: 'Linux on Windows for practice',
      isPaid: false,
    },
  ],
};
