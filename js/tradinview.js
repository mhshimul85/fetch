// MACD
//@version=4
study(title="MACD", shorttitle="MACD", resolution="")
// Getting inputs
fast_length = input(title="Fast Length", type=input.integer, defval=12)
slow_length = input(title="Slow Length", type=input.integer, defval=26)
src = input(title="Source", type=input.source, defval=close)
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9)
sma_source = input(title="Oscillator MA Type", type=input.string, defval="EMA", options=["SMA", "EMA"])
sma_signal = input(title="Signal Line MA Type", type=input.string, defval="EMA", options=["SMA", "EMA"])
// Plot colors
col_macd = input(#2962FF, "MACD Line  ", input.color, group="Color Settings", inline="MACD")
col_signal = input(#FF6D00, "Signal Line  ", input.color, group="Color Settings", inline="Signal")
col_grow_above = input(#26A69A, "Above   Grow", input.color, group="Histogram", inline="Above")
col_fall_above = input(#B2DFDB, "Fall", input.color, group="Histogram", inline="Above")
col_grow_below = input(#FFCDD2, "Below Grow", input.color, group="Histogram", inline="Below")
col_fall_below = input(#FF5252, "Fall", input.color, group="Histogram", inline="Below")
// Calculating
fast_ma = sma_source == "SMA" ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source == "SMA" ? sma(src, slow_length) : ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal
plot(hist, title="Histogram", style=plot.style_columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below)))
plot(macd, title="MACD", color=col_macd)
plot(signal, title="Signal", color=col_signal)





// RSI
//@version=4
study(title="Relative Strength Index", shorttitle="RSI", format=format.price, precision=2, resolution="")
len = input(14, minval=1, title="Length")
src = input(close, "Source", type = input.source)
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down)) // if down is 0, RSI will 100, up is 0, RSI will 0 


plot(rsi, "RSI", color=#7E57C2)
band1 = hline(70, "Upper Band", color=#787B86)
bandm = hline(50, "Middle Band", color=color.new(#787B86, 50))
band0 = hline(30, "Lower Band", color=#787B86)
fill(band1, band0, color=color.rgb(126, 87, 194, 90), title="Background")


// MFI
//@version=4
study(title="Money Flow Index", shorttitle="MFI", format=format.price, precision=2, resolution="")
length = input(title="Length", type=input.integer, defval=14, minval=1, maxval=2000)
src = hlc3
upper = sum(volume * (change(src) <= 0 ? 0 : src), length)
lower = sum(volume * (change(src) >= 0 ? 0 : src), length)
_rsi(upper, lower) =>
    100.0 - (100.0 / (1.0 + upper / lower))
mf = _rsi(upper, lower)


plot(mf, "MF", color=#7E57C2)
overbought=hline(80, title="Overbought", color=#787B86)
oversold=hline(20, title="Oversold", color=#787B86)
fill(overbought, oversold, color=color.rgb(126, 87, 194, 90), title="Background")


// EMA
//@version=4
study(title="Moving Average Exponential", shorttitle="EMA", overlay=true, resolution="")
len = input(9, minval=1, title="Length")
src = input(close, title="Source")
offset = input(title="Offset", type=input.integer, defval=0, minval=-500, maxval=500)
out = ema(src, len)
plot(out, title="EMA", color=color.blue, offset=offset)


// ATR
//@version=4
study(title="Average True Range", shorttitle="ATR", overlay=false, resolution="")
length = input(title="Length", defval=14, minval=1)
smoothing = input(title="Smoothing", defval="RMA", options=["RMA", "SMA", "EMA", "WMA"])
ma_function(source, length) =>
	if smoothing == "RMA"
		rma(source, length)
	else
		if smoothing == "SMA"
			sma(source, length)
		else
			if smoothing == "EMA"
				ema(source, length)
			else
				wma(source, length)
plot(ma_function(tr(true), length), title = "ATR", color=color.new(#B71C1C, 0))