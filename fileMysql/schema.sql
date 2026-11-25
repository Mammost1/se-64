-- Schema only (no data). Create the database first:
--   CREATE DATABASE employeeSystem CHARACTER SET utf8mb4;

CREATE TABLE `advert` (
  `advertId` int(11) NOT NULL,
  `advertImg` mediumblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `contact` (
  `contactId` int(11) NOT NULL,
  `facebook` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `line` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `gmail` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `location` varchar(300) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `introduction` (
  `introductionId` int(11) NOT NULL,
  `introductionImg` mediumblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

CREATE TABLE `news` (
  `newsId` int(11) NOT NULL,
  `newsTitle` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `newsImg` mediumblob NOT NULL,
  `newsDetails` text COLLATE utf8_unicode_ci NOT NULL,
  `newsLink` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `profile` (
  `profileId` int(11) NOT NULL,
  `studentID` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `myProfile` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`myProfile`)),
  `familyProfile` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`familyProfile`)),
  `incomeProfile` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`incomeProfile`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `totalhistory` (
  `totalHistoryId` int(11) NOT NULL,
  `scholarshipId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `latestUpdate` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `recruitStatus` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `interviewStatus` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `anouncementStatus` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `adminComment` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `toatalScore` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`toatalScore`)),
  `myProfile` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`myProfile`)),
  `familyProfile` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`familyProfile`)),
  `incomeProfile` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`incomeProfile`)),
  `idCard` mediumblob DEFAULT NULL,
  `houseRegistration` mediumblob DEFAULT NULL,
  `essay` mediumblob DEFAULT NULL,
  `nisitPicture` mediumblob DEFAULT NULL,
  `housePicture` mediumblob DEFAULT NULL,
  `studyResults` mediumblob DEFAULT NULL,
  `diseaseEffects` mediumblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `totalscholarship` (
  `scholarshipId` int(11) NOT NULL,
  `build` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `scholarshipName` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `academicYear` int(11) NOT NULL,
  `term` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `donorName` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `details` text COLLATE utf8_unicode_ci NOT NULL,
  `amount` int(11) NOT NULL,
  `capital` int(11) NOT NULL,
  `closeDate` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `applicantDocuments` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `urlBase64Img` mediumblob NOT NULL,
  `urlBase64Details` mediumblob NOT NULL,
  `interviewDate` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `startInterview` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `endInterview` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `criterion` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`criterion`)),
  `committee` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `meetingLink` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `interviewDetails` text COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `gmail` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `myProfile` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `familyProfile` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `incomeProfile` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `advert`
  ADD PRIMARY KEY (`advertId`);

ALTER TABLE `contact`
  ADD PRIMARY KEY (`contactId`);

ALTER TABLE `introduction`
  ADD PRIMARY KEY (`introductionId`);

ALTER TABLE `news`
  ADD PRIMARY KEY (`newsId`);

ALTER TABLE `profile`
  ADD PRIMARY KEY (`profileId`);

ALTER TABLE `totalhistory`
  ADD PRIMARY KEY (`totalHistoryId`),
  ADD KEY `Foreign key scholarshipId` (`scholarshipId`),
  ADD KEY `Foreign key userId` (`userId`);

ALTER TABLE `totalscholarship`
  ADD PRIMARY KEY (`scholarshipId`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

ALTER TABLE `advert`
  MODIFY `advertId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

ALTER TABLE `contact`
  MODIFY `contactId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `introduction`
  MODIFY `introductionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `news`
  MODIFY `newsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

ALTER TABLE `profile`
  MODIFY `profileId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

ALTER TABLE `totalhistory`
  MODIFY `totalHistoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

ALTER TABLE `totalscholarship`
  MODIFY `scholarshipId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

ALTER TABLE `totalhistory`
  ADD CONSTRAINT `Foreign key scholarshipId` FOREIGN KEY (`scholarshipId`) REFERENCES `totalscholarship` (`scholarshipId`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `Foreign key userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE NO ACTION;
