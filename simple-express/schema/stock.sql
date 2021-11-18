-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2021 年 11 月 18 日 11:36
-- 伺服器版本： 10.4.19-MariaDB
-- PHP 版本： 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `stock`
--

-- --------------------------------------------------------

--
-- 資料表結構 `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `update_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `members`
--

INSERT INTO `members` (`id`, `email`, `password`, `name`, `photo`, `update_date`, `created_at`) VALUES
(1, 'ruby@test.com', '$2b$10$pgEOwusPLqglW3KImI26ROCbwFPh4G1tOixzzSBco9VoyM4Mfz/Ha', 'Ruby', '/uploads/member-1631248237196.jpg', '2021-09-10 04:30:37', '2021-09-10 04:30:37'),
(2, 'apple@test.com', '$2b$10$B2PIOSCey2wj3voRtKJ.ru9F6bILn96TSfzQsbyVhcJKxhmJCmNrW', 'apple', '/uploads/member-1637206187060.png', '2021-11-18 03:29:47', '2021-11-18 03:29:47');

-- --------------------------------------------------------

--
-- 資料表結構 `stock`
--

CREATE TABLE `stock` (
  `stock_id` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stock_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `stock`
--

INSERT INTO `stock` (`stock_id`, `stock_name`) VALUES
('0056', '元大高股息'),
('2317', '鴻海'),
('2330', '台積電'),
('2454', '聯發科'),
('2603', '長榮'),
('2618', '長榮航');

-- --------------------------------------------------------

--
-- 資料表結構 `stock_price`
--

CREATE TABLE `stock_price` (
  `stock_id` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `open_price` decimal(10,2) UNSIGNED NOT NULL,
  `high_price` decimal(10,2) UNSIGNED NOT NULL,
  `low_price` decimal(10,2) UNSIGNED NOT NULL,
  `close_price` decimal(10,2) UNSIGNED NOT NULL,
  `delta_price` decimal(10,2) NOT NULL,
  `transactions` int(10) UNSIGNED NOT NULL,
  `volume` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(14,2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `stock_price`
--

INSERT INTO `stock_price` (`stock_id`, `date`, `open_price`, `high_price`, `low_price`, `close_price`, `delta_price`, `transactions`, `volume`, `amount`) VALUES
('0056', '2021-08-02', '34.03', '34.03', '33.63', '34.00', '0.10', 16356, 19027608, '642746927.00'),
('0056', '2021-08-03', '34.01', '34.16', '33.98', '34.15', '0.15', 4909, 6509353, '221721779.00'),
('0056', '2021-08-04', '34.18', '34.35', '34.17', '34.35', '0.20', 4303, 5507529, '188708774.00'),
('0056', '2021-08-05', '34.40', '34.40', '34.14', '34.20', '-0.15', 7446, 7141944, '244353893.00'),
('0056', '2021-08-06', '34.20', '34.25', '34.02', '34.25', '0.05', 7687, 9393314, '321037697.00'),
('0056', '2021-08-09', '34.22', '34.22', '33.88', '34.10', '-0.15', 7684, 12330056, '419748167.00'),
('0056', '2021-08-10', '34.10', '34.18', '33.71', '33.79', '-0.31', 21855, 29648031, '1002767511.00'),
('0056', '2021-08-11', '33.72', '33.79', '33.24', '33.49', '-0.30', 29014, 35589485, '1191140381.00'),
('0056', '2021-08-12', '33.52', '33.52', '33.33', '33.51', '0.02', 10124, 11302339, '377708778.00'),
('0056', '2021-08-13', '33.56', '33.58', '33.20', '33.27', '-0.24', 21052, 25144420, '837215156.00'),
('0056', '2021-08-16', '33.28', '33.28', '32.74', '32.86', '-0.41', 36634, 52400299, '1724117179.00'),
('0056', '2021-08-17', '32.90', '33.08', '32.48', '32.53', '-0.33', 25866, 32411406, '1059824958.00'),
('0056', '2021-08-18', '32.38', '33.07', '32.13', '33.07', '0.54', 18030, 26797263, '871484649.00'),
('0056', '2021-08-19', '32.88', '32.88', '32.29', '32.32', '-0.75', 32886, 45729062, '1486659056.00'),
('0056', '2021-08-20', '32.40', '32.49', '32.00', '32.26', '-0.06', 18984, 25525603, '821956858.00'),
('0056', '2021-08-23', '32.52', '32.90', '32.52', '32.88', '0.62', 9799, 16614441, '544894752.00'),
('0056', '2021-08-24', '33.01', '33.08', '32.66', '32.80', '-0.08', 12624, 20751854, '680143449.00'),
('0056', '2021-08-25', '32.95', '33.00', '32.80', '33.00', '0.20', 6862, 10262757, '337879491.00'),
('0056', '2021-08-26', '33.10', '33.12', '32.78', '32.99', '-0.01', 11688, 17740828, '583530862.00'),
('2317', '2021-08-02', '111.00', '113.00', '110.00', '113.00', '3.00', 11998, 24500264, '2735666103.00'),
('2317', '2021-08-03', '112.50', '113.00', '110.50', '111.50', '-1.50', 10293, 24697233, '2753719080.00'),
('2317', '2021-08-04', '112.00', '112.50', '111.00', '112.00', '0.50', 8393, 21287183, '2383267724.00'),
('2317', '2021-08-05', '111.00', '112.00', '111.00', '112.00', '0.00', 9708, 20014604, '2231990278.00'),
('2317', '2021-08-06', '111.50', '113.00', '111.00', '112.50', '0.50', 16500, 41391590, '4644148106.00'),
('2317', '2021-08-09', '112.00', '112.50', '111.00', '112.00', '-0.50', 8483, 23280701, '2603188402.00'),
('2317', '2021-08-10', '111.50', '112.00', '108.50', '108.50', '-3.50', 27993, 43432544, '4759075067.00'),
('2317', '2021-08-11', '107.00', '109.00', '106.00', '109.00', '0.50', 21961, 49868351, '5366409027.00'),
('2317', '2021-08-12', '109.00', '109.50', '108.00', '109.00', '0.00', 8730, 18592236, '2027562903.00'),
('2317', '2021-08-13', '109.50', '110.00', '108.00', '109.00', '0.00', 17924, 46681998, '5097311545.00'),
('2317', '2021-08-16', '108.50', '109.00', '106.50', '107.50', '-1.50', 16454, 35027999, '3762459490.00'),
('2317', '2021-08-17', '107.50', '108.00', '106.00', '106.50', '-1.00', 12893, 26076961, '2788145927.00'),
('2317', '2021-08-18', '105.50', '107.50', '104.50', '107.00', '0.50', 16564, 36974897, '3912990840.00'),
('2317', '2021-08-19', '106.00', '106.00', '102.50', '103.00', '-4.00', 31835, 52199317, '5427105069.00'),
('2317', '2021-08-20', '104.00', '106.00', '102.00', '104.50', '1.50', 14626, 30552525, '3181870656.00'),
('2317', '2021-08-23', '105.50', '108.00', '105.50', '107.50', '3.00', 10503, 24065630, '2572410231.00'),
('2317', '2021-08-24', '108.50', '109.00', '107.50', '109.00', '1.50', 9365, 18000797, '1953125584.00'),
('2317', '2021-08-25', '109.00', '109.00', '107.50', '108.50', '-0.50', 7852, 14477188, '1568051183.00'),
('2317', '2021-08-26', '108.50', '109.00', '107.00', '107.50', '-1.00', 7699, 13135805, '1414850208.00'),
('2330', '2021-07-01', '596.00', '597.00', '591.00', '593.00', '-2.00', 20565, 18719706, '11116195742.00'),
('2330', '2021-07-02', '590.00', '593.00', '587.00', '588.00', '-5.00', 24056, 19633718, '11562140245.00'),
('2330', '2021-07-05', '588.00', '597.00', '588.00', '591.00', '3.00', 21836, 30274105, '17957255325.00'),
('2330', '2021-07-06', '595.00', '596.00', '589.00', '592.00', '1.00', 15751, 13830591, '8185167307.00'),
('2330', '2021-07-07', '590.00', '594.00', '588.00', '594.00', '2.00', 18023, 17329148, '10250342169.00'),
('2330', '2021-07-08', '595.00', '595.00', '588.00', '588.00', '-6.00', 23352, 21596183, '12733045117.00'),
('2330', '2021-07-09', '582.00', '585.00', '580.00', '584.00', '-4.00', 51232, 30602492, '17821338170.00'),
('2330', '2021-07-12', '595.00', '597.00', '590.00', '593.00', '9.00', 28636, 33011596, '19612592644.00'),
('2330', '2021-07-13', '600.00', '608.00', '599.00', '607.00', '14.00', 60121, 54894335, '33158730436.00'),
('2330', '2021-07-14', '613.00', '615.00', '608.00', '613.00', '6.00', 43173, 39670241, '24276719505.00'),
('2330', '2021-07-15', '613.00', '614.00', '608.00', '614.00', '1.00', 29913, 23057868, '14117908308.00'),
('2330', '2021-07-16', '591.00', '595.00', '588.00', '589.00', '-25.00', 86192, 61882128, '36562482701.00'),
('2330', '2021-07-19', '583.00', '584.00', '578.00', '582.00', '-7.00', 86753, 43248966, '25135531384.00'),
('2330', '2021-07-20', '579.00', '584.00', '579.00', '581.00', '-1.00', 27956, 16352855, '9502338666.00'),
('2330', '2021-07-21', '586.00', '586.00', '580.00', '585.00', '4.00', 32757, 26476215, '15440430690.00'),
('2330', '2021-07-22', '589.00', '594.00', '587.00', '591.00', '6.00', 23365, 27075950, '16014166571.00'),
('2330', '2021-07-23', '592.00', '592.00', '583.00', '585.00', '-6.00', 23635, 15705191, '9206201715.00'),
('2330', '2021-07-26', '591.00', '591.00', '580.00', '580.00', '-5.00', 37826, 22442745, '13089591086.00'),
('2330', '2021-07-27', '581.00', '584.00', '580.00', '580.00', '0.00', 20197, 18925325, '10997959654.00'),
('2330', '2021-07-28', '576.00', '579.00', '573.00', '579.00', '-1.00', 75078, 39744486, '22884618824.00'),
('2330', '2021-07-29', '585.00', '585.00', '577.00', '583.00', '4.00', 26868, 25014772, '14525643464.00'),
('2330', '2021-07-30', '581.00', '582.00', '578.00', '580.00', '-3.00', 16353, 26141286, '15170421873.00'),
('2330', '2021-08-02', '583.00', '590.00', '580.00', '590.00', '10.00', 19791, 24948096, '14593329483.00'),
('2330', '2021-08-03', '594.00', '594.00', '590.00', '594.00', '4.00', 20221, 28104984, '16655446605.00'),
('2330', '2021-08-04', '598.00', '598.00', '594.00', '596.00', '2.00', 18228, 23714971, '14132827829.00'),
('2330', '2021-08-05', '598.00', '598.00', '593.00', '596.00', '0.00', 15495, 15673765, '9343887536.00'),
('2330', '2021-08-06', '596.00', '596.00', '588.00', '591.00', '-5.00', 13742, 13994018, '8275142201.00'),
('2330', '2021-08-09', '590.00', '595.00', '583.00', '595.00', '4.00', 15068, 17611955, '10366798182.00'),
('2330', '2021-08-10', '596.00', '596.00', '589.00', '591.00', '-4.00', 13983, 17620825, '10435618093.00'),
('2330', '2021-08-11', '590.00', '590.00', '585.00', '590.00', '-1.00', 18548, 20311399, '11943131619.00'),
('2330', '2021-08-12', '586.00', '588.00', '584.00', '586.00', '-4.00', 15202, 16031265, '9383967628.00'),
('2330', '2021-08-13', '585.00', '585.00', '579.00', '581.00', '-5.00', 36198, 25440973, '14769155709.00'),
('2330', '2021-08-16', '582.00', '586.00', '578.00', '584.00', '3.00', 17055, 19949389, '11612486234.00'),
('2330', '2021-08-17', '580.00', '582.00', '578.00', '580.00', '-4.00', 19184, 31845499, '18475506150.00'),
('2330', '2021-08-18', '568.00', '575.00', '566.00', '574.00', '-6.00', 86118, 47063629, '26855353529.00'),
('2330', '2021-08-19', '573.00', '573.00', '559.00', '559.00', '-15.00', 119048, 42133375, '23766228074.00'),
('2454', '2021-08-02', '924.00', '934.00', '920.00', '934.00', '24.00', 5452, 4122769, '3826838780.00'),
('2454', '2021-08-03', '948.00', '948.00', '930.00', '938.00', '4.00', 3738, 3168619, '2972009646.00'),
('2454', '2021-08-04', '948.00', '953.00', '941.00', '950.00', '12.00', 8307, 6227344, '5907071537.00'),
('2454', '2021-08-05', '960.00', '964.00', '952.00', '961.00', '11.00', 8722, 7656801, '7345324298.00'),
('2454', '2021-08-06', '956.00', '957.00', '935.00', '936.00', '-25.00', 6801, 3869980, '3640698712.00'),
('2454', '2021-08-09', '928.00', '928.00', '911.00', '921.00', '-15.00', 5807, 4439039, '4087240470.00'),
('2454', '2021-08-10', '930.00', '930.00', '916.00', '922.00', '1.00', 3144, 2513902, '2320569397.00'),
('2454', '2021-08-11', '913.00', '916.00', '906.00', '910.00', '-12.00', 6948, 4585315, '4175799220.00'),
('2454', '2021-08-12', '923.00', '923.00', '901.00', '904.00', '-6.00', 6828, 4309333, '3919105870.00'),
('2454', '2021-08-13', '909.00', '916.00', '901.00', '910.00', '6.00', 4922, 5316640, '4834227125.00'),
('2454', '2021-08-16', '910.00', '918.00', '900.00', '901.00', '-9.00', 5421, 3748871, '3400104149.00'),
('2454', '2021-08-17', '903.00', '905.00', '880.00', '880.00', '-21.00', 14819, 5619978, '4996772917.00'),
('2454', '2021-08-18', '870.00', '912.00', '865.00', '912.00', '32.00', 9482, 6112567, '5442899929.00'),
('2454', '2021-08-19', '908.00', '914.00', '882.00', '888.00', '-24.00', 9574, 5605024, '5009046115.00'),
('2454', '2021-08-20', '899.00', '904.00', '870.00', '873.00', '-15.00', 9040, 5568161, '4914351650.00'),
('2454', '2021-08-23', '882.00', '915.00', '882.00', '911.00', '38.00', 7145, 5355550, '4834290895.00'),
('2454', '2021-08-24', '920.00', '920.00', '903.00', '909.00', '-2.00', 3725, 3669517, '3336483251.00'),
('2454', '2021-08-25', '915.00', '915.00', '900.00', '911.00', '2.00', 3740, 4529009, '4118558224.00'),
('2454', '2021-08-26', '906.00', '907.00', '870.00', '888.00', '-23.00', 20930, 9982776, '8837978854.00'),
('2603', '2021-08-02', '133.00', '144.50', '123.50', '141.50', '9.50', 281788, 654101689, '87163069053.00'),
('2603', '2021-08-03', '140.50', '146.50', '137.50', '141.00', '-0.50', 241321, 572352123, '81384687489.00'),
('2603', '2021-08-04', '141.00', '145.00', '140.50', '143.50', '2.50', 121158, 301280543, '42974650502.00'),
('2603', '2021-08-05', '143.50', '144.50', '137.00', '138.50', '-5.00', 123296, 275125528, '38602640303.00'),
('2603', '2021-08-06', '138.00', '149.00', '137.00', '142.00', '3.50', 216663, 483808973, '69981671219.00'),
('2603', '2021-08-09', '143.00', '147.50', '142.00', '142.50', '0.50', 146560, 336946441, '48718820491.00'),
('2603', '2021-08-10', '147.00', '148.50', '138.00', '139.50', '-3.00', 170024, 411742074, '59071157421.00'),
('2603', '2021-08-11', '140.00', '141.50', '126.50', '132.00', '-7.50', 212961, 507389998, '67973974847.00'),
('2603', '2021-08-12', '134.50', '137.00', '130.50', '137.00', '5.00', 132067, 308309639, '41306359750.00'),
('2603', '2021-08-13', '137.50', '139.50', '130.50', '130.50', '-6.50', 102785, 213785296, '29158269838.00'),
('2618', '2021-08-02', '18.20', '18.60', '18.00', '18.50', '0.25', 8227, 25714839, '468920481.00'),
('2618', '2021-08-03', '18.50', '18.50', '18.10', '18.15', '-0.35', 6775, 18882680, '343966836.00'),
('2618', '2021-08-04', '18.10', '18.30', '18.10', '18.20', '0.05', 5120, 15843124, '288333983.00'),
('2618', '2021-08-05', '18.55', '18.60', '18.10', '18.15', '-0.05', 10785, 28091067, '514798070.00'),
('2618', '2021-08-06', '18.25', '18.50', '18.15', '18.20', '0.05', 7011, 25457476, '466016077.00'),
('2618', '2021-08-09', '19.05', '20.00', '19.00', '20.00', '1.80', 25602, 110884204, '2192109340.00'),
('2618', '2021-08-10', '19.80', '19.90', '19.00', '19.40', '-0.60', 40841, 173832006, '3370955441.00'),
('2618', '2021-08-11', '19.20', '19.35', '18.30', '18.45', '-0.95', 21938, 83827857, '1579377367.00'),
('2618', '2021-08-12', '19.05', '19.20', '18.65', '18.75', '0.30', 13565, 58597346, '1108253061.00'),
('2618', '2021-08-13', '19.00', '19.70', '18.80', '18.80', '0.05', 27409, 96143979, '1852632407.00'),
('2618', '2021-08-16', '18.65', '18.65', '18.10', '18.20', '-0.60', 14375, 51509098, '944239067.00'),
('2618', '2021-08-17', '18.20', '18.55', '18.10', '18.35', '0.15', 8191, 30735819, '562207498.00'),
('2618', '2021-08-18', '18.00', '18.60', '17.45', '18.50', '0.15', 24043, 77260229, '1392866938.00'),
('2618', '2021-08-19', '18.45', '18.90', '18.20', '18.35', '-0.15', 14391, 51073912, '949164605.00'),
('2618', '2021-08-20', '18.60', '18.70', '18.00', '18.05', '-0.30', 11690, 38396830, '697982464.00'),
('2618', '2021-08-23', '18.45', '19.30', '18.40', '19.10', '1.05', 21103, 90972426, '1721082932.00'),
('2618', '2021-08-24', '18.95', '19.15', '18.55', '18.65', '-0.45', 12238, 52684502, '988100835.00'),
('2618', '2021-08-25', '18.75', '19.05', '18.50', '18.95', '0.30', 9389, 35640674, '670779368.00'),
('2618', '2021-08-26', '19.30', '19.30', '18.75', '18.90', '-0.05', 7298, 26620964, '505267486.00'),
('2618', '2021-09-01', '19.30', '19.30', '18.65', '18.85', '-0.35', 8463, 29998717, '568008903.00'),
('2618', '2021-09-02', '18.80', '18.80', '18.45', '18.45', '-0.40', 7784, 27486971, '509808639.00'),
('2618', '2021-09-03', '18.50', '18.60', '18.15', '18.20', '-0.25', 8934, 27592724, '504847256.00');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`stock_id`),
  ADD KEY `stock_id` (`stock_id`);

--
-- 資料表索引 `stock_price`
--
ALTER TABLE `stock_price`
  ADD PRIMARY KEY (`stock_id`,`date`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `stock_price`
--
ALTER TABLE `stock_price`
  ADD CONSTRAINT `stock_price_ibfk_1` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`stock_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
