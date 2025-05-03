-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-05-2025 a las 04:31:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ikati`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `contrasena` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `usuario`, `contrasena`) VALUES
(4, 'Campos', '123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aviso_stock`
--

CREATE TABLE `aviso_stock` (
  `id_producto` int(11) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carro`
--

CREATE TABLE `carro` (
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha` date DEFAULT curdate(),
  `id_cupon` int(11) DEFAULT NULL,
  `importe` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra_producto`
--

CREATE TABLE `compra_producto` (
  `id_compra` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `descuento` double DEFAULT NULL,
  `precio` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cupones`
--

CREATE TABLE `cupones` (
  `id` int(11) NOT NULL,
  `codigo` varchar(20) DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  `descuento` double DEFAULT NULL,
  `tipo_descuento` enum('porcentaje','fijo') DEFAULT NULL,
  `fecha_expiracion` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `filtros`
--

CREATE TABLE `filtros` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `filtro` varchar(100) NOT NULL,
  `valor` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  `animal` varchar(50) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `descuento` decimal(10,2) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `valoracion` decimal(2,1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `latitud` decimal(10,8) NOT NULL,
  `longitud` decimal(11,8) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `web` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido1` varchar(50) NOT NULL,
  `apellido2` varchar(50) DEFAULT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `cp` varchar(10) NOT NULL,
  `direccion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido1`, `apellido2`, `usuario`, `contrasena`, `email`, `telefono`, `cp`, `direccion`) VALUES
(41, 'Juan', 'Lopez', 'Herrero', 'JLH', '123', 'JLH@gmail.com', '666666666', '28050', 'General Margallo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variantes`
--

CREATE TABLE `variantes` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `precio` decimal(8,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `nombre_variacion` varchar(100) NOT NULL,
  `valor_variacion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`usuario`);

--
-- Indices de la tabla `aviso_stock`
--
ALTER TABLE `aviso_stock`
  ADD PRIMARY KEY (`id_producto`,`email`);

--
-- Indices de la tabla `carro`
--
ALTER TABLE `carro`
  ADD PRIMARY KEY (`id_usuario`,`id_producto`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cupon` (`id_cupon`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `compra_producto`
--
ALTER TABLE `compra_producto`
  ADD PRIMARY KEY (`id_compra`,`id_producto`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `cupones`
--
ALTER TABLE `cupones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `filtros`
--
ALTER TABLE `filtros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- Indices de la tabla `variantes`
--
ALTER TABLE `variantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cupones`
--
ALTER TABLE `cupones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `filtros`
--
ALTER TABLE `filtros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `variantes`
--
ALTER TABLE `variantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aviso_stock`
--
ALTER TABLE `aviso_stock`
  ADD CONSTRAINT `aviso_stock_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `carro`
--
ALTER TABLE `carro`
  ADD CONSTRAINT `carro_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carro_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`id_cupon`) REFERENCES `cupones` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `compra_producto`
--
ALTER TABLE `compra_producto`
  ADD CONSTRAINT `compra_producto_ibfk_1` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `compra_producto_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `filtros`
--
ALTER TABLE `filtros`
  ADD CONSTRAINT `filtros_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `variantes`
--
ALTER TABLE `variantes`
  ADD CONSTRAINT `variantes_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
