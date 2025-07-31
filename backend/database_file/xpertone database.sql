-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2025 at 06:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xpertone_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2b$10$c1NhlnNqToArlAXo7.UAX./pMhut8Abv68u8defmyW/9IgOLtbhhq');

-- --------------------------------------------------------

--
-- Table structure for table `angels`
--

CREATE TABLE `angels` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `instagram` varchar(100) NOT NULL,
  `tiktok` varchar(100) NOT NULL,
  `youtube` varchar(255) NOT NULL,
  `youtube_image` varchar(255) NOT NULL,
  `followers` int(11) NOT NULL,
  `niche` varchar(100) NOT NULL,
  `other_niche` varchar(100) DEFAULT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `angels`
--

INSERT INTO `angels` (`id`, `name`, `email`, `phone`, `instagram`, `tiktok`, `youtube`, `youtube_image`, `followers`, `niche`, `other_niche`, `description`, `created_at`) VALUES
(19, 'khubaib3', 'khubaibintariq123@gmail.com', '+92 0000000003000000', 'https://www.instagram.com/khubaib9202?igsh=cWJ6dXEwZWhyMHBu', 'https://www.tiktok.com/@khubaib.tariq?_t=ZS-8yIupL7xs63&_r=1', 'Web expert', '/uploads/1753421270523-48161841.jpg', 1000, 'Animals', NULL, 'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii iiiiiiiiiiiiiiiiiiiiiiiiiii', '2025-07-25 05:27:50'),
(20, 'khubaib3', 'khubaibintariq123@gmail.com', '+92 0000000003000000', 'https://www.instagram.com/khubaib9202?igsh=cWJ6dXEwZWhyMHBu', 'https://www.tiktok.com/@khubaib.tariq?_t=ZS-8yIupL7xs63&_r=1', 'Web expert', '/uploads/1753421316075-938737758.jpg', 1000, 'Animals', NULL, 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', '2025-07-25 05:28:36'),
(22, 'khubaib32', 'khubaibintariq123@gmail.com', '+92 0000000003000000', 'https://www.instagram.com/khubaib9202?igsh=cWJ6dXEwZWhyMHBu', 'https://www.tiktok.com/@khubaib.tariq?_t=ZS-8yIupL7xs63&_r=1', 'Web expert', '/uploads/1753435933456-902868865.png', 1000, 'Food', NULL, 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvg', '2025-07-25 09:32:13'),
(23, 'khubaib89', 'khubaibintariq123@gmail.com', '+92 0000000003000000', 'https://www.instagram.com/khubaib9202?igsh=cWJ6dXEwZWhyMHBu', 'https://www.tiktok.com/@khubaib.tariq?_t=ZS-8yIupL7xs63&_r=1', 'Web expert', '/uploads/1753459890622-101647770.png', 1000, 'Food', NULL, 'kkkkkkkkkkkkkkkkkkkkk', '2025-07-25 16:11:30');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `speaker` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `name`, `email`, `phone`, `speaker`, `created_at`) VALUES
(0, 'khubaib44', 'khubaibintariq123@gmail.com', '+92 0000000003000000', 'khubaib3', '2025-07-25 11:32:15'),
(0, 'khubaib45', 'khubaibintariq123@gmail.com', '+92 0000000003000000', 'khubaib3', '2025-07-25 11:53:53'),
(0, 'khubaib4', 'khubaibintariq123@gmail.com', '+92 0000000003000000', 'khubaib32', '2025-07-25 11:54:08'),
(0, 'khubaib00', 'khubaibintariq123@gmail.com', '+92 0000000003000000', 'khubaib3', '2025-07-25 11:54:34'),
(0, 'khubaib11', 'khubaibintariq123@gmail.com', '+92 0000000003000000', 'khubaib32', '2025-07-25 14:45:27'),
(0, 'khubaib', 'khubaibintariq123@gmail.com', '+92 0000000003000000', 'khubaib3', '2025-07-25 15:57:47'),
(0, 'khubaibyy', 'khubaibintariq123@gmail.com', '+92 0000000003000000', 'khubaib89', '2025-07-25 16:11:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `angels`
--
ALTER TABLE `angels`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `angels`
--
ALTER TABLE `angels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
