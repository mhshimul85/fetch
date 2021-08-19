$(function(){
    // Variables
    var expected_returns_principal, expected_returns_interest, expected_returns_period_o, expected_returns_period_i

    // Functions
    function data_input(){
        expected_returns_principal = $('#expected_returns_principal').val() * 1;
        expected_returns_interest = $('#expected_returns_interest').val() * 1;
        expected_returns_period_o = $('#expected_returns_period_o').val() * 1;
        expected_returns_period_i = $('#expected_returns_period_i').val() * 1;
    }

    function expected_return(){
        data_input();

        var expected_amount = (expected_returns_principal * Math.pow((1 + (expected_returns_interest / 100)), (expected_returns_period_o * expected_returns_period_i))).toFixed(0);

        return `${expected_amount} (${(((expected_amount - expected_returns_principal) * 100) / expected_returns_principal).toFixed(2)}%)`
    }

    // Events
    $('#expected_returns_principal').keyup(function(){
        $('.expected_amount').text(expected_return())
    });

    $('#expected_returns_interest').keyup(function(){
        $('.expected_amount').text(expected_return())
    });

    $('#expected_returns_period_i').keyup(function(){
        $('.expected_amount').text(expected_return())
    });

    $('#expected_returns_period_o').change(function(){
        $('.expected_amount').text(expected_return())
    });
})