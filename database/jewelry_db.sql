-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2022 at 01:26 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jewelry_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id_account` varchar(30) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `date_creation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id_account`, `firstname`, `lastname`, `email`, `phone`, `password`, `date_creation`) VALUES
('aze95dsq6', 'bibo', 'zagha', 'raed.boafif@gmail.com', '9875552', '$2y$10$icOfVji9qMqWIQnmmDlX7OQpljQqSXJ.bfujOzkpZCV', '2022-07-01 14:52:35'),
('dsqdqs56e5az6', 'biboe', 'ezaeaz', 'raed99@gmail.com', '565965954', '$2y$10$Xj3cYSKQuoF0g6aP8IEUE.9G7YsCwTgH9.BiEHNjyMqutj4R0otDe', '2022-07-01 15:16:02'),
('Y4Y5iSjUz6o6Qx8DnUi3h4k71', 'aezaezar', 'a9wa', 'azerty@gmail.com', 'AW|297 4878', '$2y$10$IPwqV9pmHuF8PPwmvDYz5esbR3aYCQrtGIqzfnWsdeej4rjeNLz.G', '2022-07-01 15:53:21'),
('zaeozakkp', 'Raed', 'BF', 'raed.bouafif@istic.ucar.tn', '1234569', '$2y$10$2mtPLFlPaL/Gp9f0v.oTNe/mZK1e9BBnNPbr1fC5OxY', '2022-07-01 14:10:26');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id_contact` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `operation`
--

CREATE TABLE `operation` (
  `email` varchar(255) NOT NULL,
  `id_operation` varchar(255) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `operation`
--

INSERT INTO `operation` (`email`, `id_operation`, `date`) VALUES
('3yHN7yMA4Pxqqll4y2V6kiVrU', 'raed99@gmail.com', '2022-07-01 19:06:53');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id_order` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `address_1` varchar(255) NOT NULL,
  `address_2` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `order_note` text NOT NULL,
  `total` decimal(25,5) NOT NULL,
  `id_account` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id_order`, `first_name`, `last_name`, `address_1`, `address_2`, `city`, `state`, `country`, `email`, `phone`, `order_note`, `total`, `id_account`, `date`) VALUES
('3ml6N050Xdl26145W550N2cu221iP4WImc3i24tWR0Aj0', 'aaazez', 'aaazezaaazez', 'aaazezaaazezaaazez', 'azeqfdfsaaazez', 'aaazez5959', 'aaazezaaazezdqsdq', 'AG|1268', 'raed.boafif@gmail.com', '50137376', 'daaazezaaazezaaazezaaazezdfqdfdaaazezaaazezaaazez', '17.58000', 'dsqdqs56e5az6', '2022-07-01 19:50:54'),
('3ur2y4cYX2e24Q46O9U1ZxWy7cRvM85e6dNcimKn99uOA', 'Raed', 'Bouafif', 'Kelibia', 'rezarazeaz', 'Kelibia', 'fdsfsdf', 'AI|1264', 'raed.boafief@gmail.com', '50137376', 'fqdfsqdfsd', '7.90000', 'dsqdqs56e5az6', '2022-07-01 20:17:46'),
('5h9Vw30Ljn6L2qeFS8ySs7ZP5ZwKwAsl9TtKaHedLvGy3', 'Raed', 'Bouafif', 'Kelibia', '', 'Kelibia', 'fdqfsdfds', 'GB|44', 'raed.boafif@gmail.com', '50137376', 'rarzaeazra', '2.90000', 'dsqdqs56e5az6', '2022-07-01 20:11:06'),
('8Ae0gZzSi8768HRVH4gFO0lVpfd1805VvEy5rCBK27wpO', 'Raed', 'Bouafif', 'Kelibia', '', 'Kelibia', 'aezaeaz', 'BS|1242', 'raed.boafif@gmail.com', '50137376', '', '20.21000', 'dsqdqs56e5az6', '2022-07-01 20:42:46'),
('8TKV9y7i1Idw1kb1FKvj1enpjtT26kszHaL2HA7LvY3CB', 'aabiiiiiiiiiiiboooaaa', 'Bouafif', 'Kelibia', 'qdqsdsq', 'Kelibia', 'aezaraz', 'BB|1246', 'raed.boafif@gmail.com', '50137376', 'fsdqfsqdf', '222.62000', 'dsqdqs56e5az6', '2022-07-01 21:06:56'),
('aOVkL1BC79wz2FMwAVg78xuBZ41JHo8n4P90089l0Gd29', 'balighhhh', 'Bouafif', 'Kelibia', 'cdsfdsfd', 'Kelibia', 'eza', 'ZM|260', 'raed.boafif@gmail.com', '50137376', '', '62.75000', 'dsqdqs56e5az6', '2022-07-01 21:01:33'),
('Clow1lV7774T58d6xl0k0Vp66vBF6m8PQ69Zhk3f9549E', 'Raed', 'Bouafif', 'Kelibia', 'azeasq', 'Kelibia', 'razrzae', 'AG|1268', 'eraed.boafif@gmail.com', '50137376', '', '10.62000', 'dsqdqs56e5az6', '2022-07-01 20:33:04'),
('GM1KfEN32ugL64da3F6VF81la9ylykGNAj97QKgdq50k9', 'bibo', 'Bouafif', 'Kelibia', 'azeza', 'Kelibia', 'dqsdqsfqfqs', 'GB|44', 'raed.boafif@gmail.com', '50137376', '', '169.04000', 'dsqdqs56e5az6', '2022-07-01 21:04:33'),
('KmV3FWkw9FzZz1Y1z0wGqceIt6YCO75kObgE08Y3v9T42', 'okko99okko99okko99', 'okko99', 'fqsdsqokko99', 'gdsfsgfsgsd', 'okko99okko99okko99', 'aeazeazrzarza', 'BH|973', 'raed.boafif@gmail.com', '50137376', 'okko99okko99okko99dfsfdsfds', '2.90000', 'dsqdqs56e5az6', '2022-07-01 20:08:13'),
('qkC56sbnBe7UkwQ57cP9h6U9bnxvP9V1z3QEIujcJ2s5t', 'Raed', 'Bouafif', 'Kelibia', '', 'Kelibia', 'azeazra', 'AZ|994', 'raed.boafif@gmail.com', '50137376', '', '2.90000', 'dsqdqs56e5az6', '2022-07-01 20:57:31'),
('S9jPI3jb39vetle49ugBdo91HlHBKyf06SOQS0YQuHDi7', 'Raedaze', 'Bouafifr', 'Kelibia', 'qdqsdqsd', 'Kelibia', 'aezafqfq', 'BH|973', 'raed.boafif@gmail.coma', '50137376', '', '7.72000', 'dsqdqs56e5az6', '2022-07-01 20:23:39'),
('U0fG874g87th20vNBgjoJno2Rb7K4AhFJ74L26T7llD7B', 'Raed', 'Bouafif', 'Kelibia', 'qsd', 'Kelibia', 'fffffaze', 'BH|973', 'raed.boafif@gmail.com', '50137376', '', '2.90000', 'dsqdqs56e5az6', '2022-07-01 20:37:04'),
('uM853DTQBP5u7p7W0WHxYf7gOGZgEIOahFCxd58gSzNzo', 'Raedr', 'Bouafif', 'Kelibia', 'aezat', 'Kelibia', 'qdqsdqsf', 'AR|54', 'raezed.boafif@gmail.com', '50137376', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '2.90000', 'dsqdqs56e5az6', '2022-07-01 20:21:44'),
('xl3t42sVsVuNO1r0fnOo7XvVg8fZjuOyFNtxEe30l3Osr', 'Raed', 'Bouafif', 'Kelibia', 'aaaaa', 'Kelibia', 'eeee', 'BY|375', 'raed.boafif@gmail.com', '50137376', '', '2.90000', 'dsqdqs56e5az6', '2022-07-01 20:34:42');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `image` varchar(400) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(25,5) NOT NULL,
  `quantity` int(20) NOT NULL,
  `size` varchar(100) NOT NULL,
  `color` varchar(250) NOT NULL,
  `len` varchar(255) NOT NULL,
  `ring_size` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `id_order` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id_product`, `sku`, `image`, `name`, `price`, `quantity`, `size`, `color`, `len`, `ring_size`, `date`, `id_order`) VALUES
(7, 'T2EB3344', 'https://i.knwt.co/ebijuteri/EB3344/1647959782_EB3344_1648213311644.jpg', 'Men\'s Grey Hematite Gemmed Adjustable Bracelet', '2.90335', 1, 'STD', '', '', '', '2022-07-01 21:04:33', 'GM1KfEN32ugL64da3F6VF81la9ylykGNAj97QKgdq50k9'),
(8, 'T2BS1818-KS', 'https://storage.googleapis.com/knawat-suppliers-img/ebijuteri/BS1818-KS/BS1818-1_1619207200087.jpg', 'Women\'s Leather Cord Metal Case Watch', '7.72437', 1, 'STD', '', '', '', '2022-07-01 21:04:33', 'GM1KfEN32ugL64da3F6VF81la9ylykGNAj97QKgdq50k9'),
(9, 'T2BS1206', 'https://storage.googleapis.com/knawat-suppliers-img/ebijuteri/BS1206/BS1206-111_1619207558065.jpg', 'Women\'s Black Leather Corded Watch', '7.90033', 1, 'STD', '', '', '', '2022-07-01 21:04:33', 'GM1KfEN32ugL64da3F6VF81la9ylykGNAj97QKgdq50k9'),
(10, 'TEBT33606', 'https://storage.googleapis.com/knawat-suppliers-img/tesbihhane/T33606/faset-kesim-aqua-mavi-zirkon-tasli-kisiye-ozel-isim-yazili-925-ayar-gumus-erkek-yuzuk-kiiye-zel-yzkler-tesbihane-54069-33-B_1628074767274.jpg', 'Men\'s Aqua Blue Zircon Gemmed 925 Carat Silver Ring', '85.88066', 1, '', '', '', '14', '2022-07-01 21:04:34', 'GM1KfEN32ugL64da3F6VF81la9ylykGNAj97QKgdq50k9'),
(11, 'T2SGK1360', 'https://i.knwt.co/ebijuteri/SGK1360/1643800351_SVG1360-1_1643928191621.jpg', 'Couple\'s Silver Straw Metal Strap Watches', '20.21756', 1, 'STD', '', '', '', '2022-07-01 21:04:34', 'GM1KfEN32ugL64da3F6VF81la9ylykGNAj97QKgdq50k9'),
(12, 'GUGUM-EA1160212', 'https://storage.googleapis.com/knawat-suppliers-img/gumush/GUM-EA1160212/gumus-kar-tanes_1592720867800.jpg', 'Girl\'s Snowflake Figure Silver Earrings', '11.40761', 1, 'STD', '', '', '', '2022-07-01 21:04:34', 'GM1KfEN32ugL64da3F6VF81la9ylykGNAj97QKgdq50k9'),
(13, 'GUGUM-T3959', 'https://storage.googleapis.com/knawat-suppliers-img/gumush/GUM-T3959/gumus-ari-figur_1592450206972.jpg', 'Girl\' Bear Accessory Silver Bracelet', '25.70515', 1, 'STD', '', '', '', '2022-07-01 21:04:34', 'GM1KfEN32ugL64da3F6VF81la9ylykGNAj97QKgdq50k9'),
(14, 'TAK8699100327357-31025', 'https://i.knwt.co/takıştır/8699100327357-31025/gumus-renk-unisex-halka-kupe-tek--05b87_1629976867140.jpg', 'Unisex Silver Earring - 1 Piece', '1.01103', 1, '', 'Silver', '', '', '2022-07-01 21:04:34', 'GM1KfEN32ugL64da3F6VF81la9ylykGNAj97QKgdq50k9'),
(15, 'LBLLBERKYZKAGK1084-14232', 'https://i.knwt.co/labalaba/LBERKYZKAGK1084-14232/erkek-antik-gumus-kaplama-2li-kartal-p-04-bb8_1639634144430.jpg', 'Men\'s Antique Silver Plated Ring', '6.33028', 1, 'STD', '', '', '', '2022-07-01 21:04:34', 'GM1KfEN32ugL64da3F6VF81la9ylykGNAj97QKgdq50k9'),
(16, 'T2EB3344', 'https://i.knwt.co/ebijuteri/EB3344/1647959782_EB3344_1648213311644.jpg', 'Men\'s Grey Hematite Gemmed Adjustable Bracelet', '2.90335', 1, 'STD', '', '', '', '2022-07-01 21:06:56', '8TKV9y7i1Idw1kb1FKvj1enpjtT26kszHaL2HA7LvY3CB'),
(17, 'TEBT33606', 'https://storage.googleapis.com/knawat-suppliers-img/tesbihhane/T33606/faset-kesim-aqua-mavi-zirkon-tasli-kisiye-ozel-isim-yazili-925-ayar-gumus-erkek-yuzuk-kiiye-zel-yzkler-tesbihane-54069-33-B_1628074767274.jpg', 'Men\'s Aqua Blue Zircon Gemmed 925 Carat Silver Ring', '85.88066', 1, '', '', '', '14', '2022-07-01 21:06:56', '8TKV9y7i1Idw1kb1FKvj1enpjtT26kszHaL2HA7LvY3CB'),
(18, 'LBLLBERKYZKAGK1084-14232', 'https://i.knwt.co/labalaba/LBERKYZKAGK1084-14232/erkek-antik-gumus-kaplama-2li-kartal-p-04-bb8_1639634144430.jpg', 'Men\'s Antique Silver Plated Ring', '6.33028', 1, 'STD', '', '', '', '2022-07-01 21:06:56', '8TKV9y7i1Idw1kb1FKvj1enpjtT26kszHaL2HA7LvY3CB'),
(19, 'TAK8699100326435-31034', 'https://i.knwt.co/takıştır/8699100326435-31034/gumus-renk-top-figurlu-sikistirmali-un-2a0a-2_1629976872576.jpg', 'Unisex Silver Earring - 1 Piece', '1.01103', 1, '', 'Silver', '', '', '2022-07-01 21:06:57', '8TKV9y7i1Idw1kb1FKvj1enpjtT26kszHaL2HA7LvY3CB'),
(20, 'T2BS1818-KS', 'https://storage.googleapis.com/knawat-suppliers-img/ebijuteri/BS1818-KS/BS1818-1_1619207200087.jpg', 'Women\'s Leather Cord Metal Case Watch', '7.72437', 1, 'STD', '', '', '', '2022-07-01 21:06:57', '8TKV9y7i1Idw1kb1FKvj1enpjtT26kszHaL2HA7LvY3CB'),
(21, 'T2BS1206', 'https://storage.googleapis.com/knawat-suppliers-img/ebijuteri/BS1206/BS1206-111_1619207558065.jpg', 'Women\'s Black Leather Corded Watch', '7.90033', 1, 'STD', '', '', '', '2022-07-01 21:06:57', '8TKV9y7i1Idw1kb1FKvj1enpjtT26kszHaL2HA7LvY3CB'),
(22, 'T2SGK1360', 'https://i.knwt.co/ebijuteri/SGK1360/1643800351_SVG1360-1_1643928191621.jpg', 'Couple\'s Silver Straw Metal Strap Watches', '20.21756', 1, 'STD', '', '', '', '2022-07-01 21:06:57', '8TKV9y7i1Idw1kb1FKvj1enpjtT26kszHaL2HA7LvY3CB'),
(23, 'GUGUM-EA1160212', 'https://storage.googleapis.com/knawat-suppliers-img/gumush/GUM-EA1160212/gumus-kar-tanes_1592720867800.jpg', 'Girl\'s Snowflake Figure Silver Earrings', '11.40761', 1, 'STD', '', '', '', '2022-07-01 21:06:57', '8TKV9y7i1Idw1kb1FKvj1enpjtT26kszHaL2HA7LvY3CB'),
(24, 'GUGUM-EA1160210', 'https://storage.googleapis.com/knawat-suppliers-img/gumush/GUM-EA1160210/gumus-kirmizi-p_1592448221477.jpg', 'Girl\'s Gemmed Red Silver Earrings', '11.40761', 1, 'STD', '', '', '', '2022-07-01 21:06:57', '8TKV9y7i1Idw1kb1FKvj1enpjtT26kszHaL2HA7LvY3CB'),
(25, 'GUGUM-EA1160209', 'https://storage.googleapis.com/knawat-suppliers-img/gumush/GUM-EA1160209/gumus-pembe-kel_1592720961379.jpg', 'Girl\'s Pink Butterfly Figure Silver Earrings', '16.47766', 1, 'STD', '', '', '', '2022-07-01 21:06:57', '8TKV9y7i1Idw1kb1FKvj1enpjtT26kszHaL2HA7LvY3CB'),
(26, 'GUGUM-T3960', 'https://storage.googleapis.com/knawat-suppliers-img/gumush/GUM-T3960/gumus-balik-fig_1592450240531.jpg', 'Girl\'s Fish Figure Rose Plated Silver Bracelet', '25.70515', 1, 'STD', '', '', '', '2022-07-01 21:06:57', '8TKV9y7i1Idw1kb1FKvj1enpjtT26kszHaL2HA7LvY3CB'),
(27, 'GUGUM-T3959', 'https://storage.googleapis.com/knawat-suppliers-img/gumush/GUM-T3959/gumus-ari-figur_1592450206972.jpg', 'Girl\' Bear Accessory Silver Bracelet', '25.70515', 1, 'STD', '', '', '', '2022-07-01 21:06:58', '8TKV9y7i1Idw1kb1FKvj1enpjtT26kszHaL2HA7LvY3CB');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id_account`),
  ADD UNIQUE KEY `email_unique` (`email`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id_contact`);

--
-- Indexes for table `operation`
--
ALTER TABLE `operation`
  ADD PRIMARY KEY (`id_operation`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `FK_id` (`id_account`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `FK_11` (`id_order`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id_contact` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_id` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_11` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
