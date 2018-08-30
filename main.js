var dealinguri = "http://whatismyspecialday.com/rc20_se";
var suggestions_dealinguri = "http://whatismyspecialday.com/h1_sugg";

var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var loadmorecounter = 0;


var ads_dealinguri = "http://gawgle.com/adscentral/";


function getadynamdata() {

    Ajax.call({
        url: ads_dealinguri + "adsmgr/filltheadsarea_html/",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_app_version').val(),
            platform: $('#txt_platform').val(),
            fakeappname: $('#txt_app_name').val(),
            AppName: $('#txt_app_name').val()

        },
        success: function (data) {
            if (data != "") {
                $('#dvdynamicserverads').html(data);

            }

        },
        error: function (error) {

        },
        complete: function () {

        }
    });
}


function back_to_home() {
    $('#Register').css('display', 'none');
    $('#near_by_locations').css('display', 'none');
    $('#places_result').css('display', 'none');
    $('#search_result').css('display', 'none');
    $('#contacts_in_common').css('display', 'none');
    $('#places_result_effect').html('');

}

function close_main_subscription_layer()
{

    $('#mainsubscriptionsystem').hide('slidedown');

    myScroll.refresh();

    event.stopPropagation();
    event.preventDefault();
}

$(document).ready(function () {

    getpointscenter_quick();

    $('.in_app_item').bind('click', function () {
        try {
            AndroidFunction.trigger_in_app($(this).attr("cust_in_app_id"));
        }
        catch (ex) {
            console.log(ex);
        }
    });

     $('#btn_in_app_subscription_item').bind('touchend', function () {


            $('#mainsubscriptionsystem').show('slideup');

     });

     $('#btn_get_pro_subscription_in_app').bind('touchend',function(){

        if (($('#txt_devuid').val() != "") && ($('#inptsrvuid').val() == "")) {
               check_for_my_identity_on_the_server();
        }

        if ($('#phonenbr').val() == "") {
              $('#txt_verification_reason').val("pro");
              close_main_subscription_layer();
              $('#phone_number__not_verified_modal').openModal();
               return;
        }

        try {
               AndroidFunction.trigger_in_app($(this).attr("cust_in_app_id"));
            }
            catch (ex) {
                console.log(ex);
            }

         });



        $('#btnclosemainsubscriptionsystem').bind('touchend', function () {

            $('#mainsubscriptionsystem').hide('slidedown');

             event.stopPropagation();
             event.preventDefault();

        });





    $('#btn_remove_ads_handler').bind('click', function (event) {

        var cur_balance = eval($('#spnofrealbal').html());

        if (cur_balance = 50) {
            $('#no_enough_balance_modal').openModal();

        }
        else {
            $('#remove_ads_from_app_modal').openModal();
        }


    });

$('#btn_synch_contacts_handler').bind('click', function (event) {


                                                        swal({
                                                             title: "Are you sure?",
                                                             text: "By clicking on Yes button, You agree to our terms and conditions to share and submit your contacts to our servers.",
                                                             type: "warning",
                                                             showCancelButton: true,
                                                             confirmButtonColor: "#DD6B55",
                                                             confirmButtonText: "Yes, sure!",
                                                             closeOnConfirm: true
                                                             },
                                                             function () {
                                                              AndroidFunction.ask_for_band_consuming("101");

                                                            // swal("Congrats!", "Thank you for sharing your contacts", "success");
                                                            // });

                                                    });
  });

    $('#btn_my_profile_pic_container').bind('click', function (event) {

        AndroidFunction.trigger_pic_changer("");

    });


    $('#left_side_menu_profile_pic').bind('click', function () {
        $('#sidenav-overlay').trigger('click');

        hide_all_layers();
        show_a_layer('li_profile_page');
        myScroll.refresh();

    });

    $('#side_of_side_yourname').bind('click', function () {
        $('#sidenav-overlay').trigger('click');

        hide_all_layers();
        show_a_layer('li_profile_page');
        myScroll.refresh();

    });

    $('#side_of_side_profile').bind('click', function () {
        $('#sidenav-overlay').trigger('click');

        hide_all_layers();
        show_a_layer('li_profile_page');
        myScroll.refresh();

    });

    $('#btn_contact_details_c_share').bind('click', function () {
        var text_to_share = $('#txt_contact_details_c_text_to_share').val();
        try {
            AndroidFunction.share(text_to_share, "Arab Caller");
        }
        catch (ex) {
            console.log(ex);
        }
    });

    $('#btn_menu_share_app').bind('click', function () {
        var text_to_share = $('#outAppShareText').val();
        try {
            AndroidFunction.share_current_apps(text_to_share, "Arab Caller");

        }
        catch (ex) {
            console.log(ex);
        }
    });
 
 $('#btn_menu_rate_app').bind('click', function () {
        try {
            AndroidFunction.rate_current_apps("Arab Caller");

        }
        catch (ex) {
            console.log(ex);
        }
    });

    $('#srch-term').autocomplete({
        lookup: function (query, done) {
            Ajax.call({
                url: suggestions_dealinguri + "/smartandlight/gtsrhpred",
                cache: false,
                type: 'GET',
                dataType: 'json',
                async: true,
                data: {
                    q: query,
                    devuid: $('#txt_devuid').val(),
                    platform: $("#txt_platform").val(),
                    vers: $('#txt_version').val(),
                    dvuniqueuserid: $('#inptsrvuid').val(),
                    fcntry: $('option:selected', $('#cmbcountries')).attr('ccode').replace("+", "")
                },
                success: function (data) {
                    var suggestions = [];

                    $.each(data.t, function (index, item) {
                        suggestions.push({ value: item.value, data: item.data });
                    });
                    var result = { suggestions: suggestions };
                    done(result);

                },
                error: function (error) {

                },
                complete: function () {

                }
            });

        },
        onSelect: function (suggestion) {

            $('#btnsearch_loop').attr('class', 'ion-search');
            searfor();
        }
    });

    $('#btn_report_a_number_submit_button').bind('click', function () {

        Ajax.call({
            url: dealinguri + "/search/report_this_number",
            cache: false,
            type: 'GET',
            async: true,
            data: {
                devuid: $('#txt_devuid').val(),
                platform: $("#txt_platform").val(),
                vers: $('#txt_version').val(),
                dvuniqueuserid: $('#inptsrvuid').val(),
                reported_id: $('#report_a_number_modal_wanted_id').val()
            },
            success: function (data) {


                $('#report_a_number_modal').closeModal();
                toast_it("Thank you, a report submitted to admin team.");

            },
            error: function (error) {

                $('#report_a_number_modal').closeModal();

                toast_it("Failed to send the report.");

            },
            complete: function () {

            }
        });



    });

    $('#btn_activate_deactivate_submit_button').bind('click', function () {

        Ajax.call({
            url: dealinguri + "/Users/act_deact",
            cache: false,
            type: 'GET',
            async: true,
            data: {
                devuid: $('#txt_devuid').val(),
                platform: $("#txt_platform").val(),
                vers: $('#txt_version').val(),
                cautocoding: $('#inptsrvuid').val(),
                s: $('#txt_next_account_status').val()
            },
            success: function (data) {


                $('#activate_deactivate_modal').closeModal();
                send_to_native();

                toast_it("Thank you, your account status has been changed.");



                back_to_home();
            },
            error: function (error) {

                $('#activate_deactivate_modal').closeModal();

                toast_it("Failed to change your account status, please try again.");

            },
            complete: function () {

            }
        });



    });

    $('#btnadd_nick_name_button').bind('click', function () {

        $('#add_nick_name_modal').closeModal();
        var option_c_code = $('option:selected', $('#defaultCountry')).attr('ccode');

        Ajax.call({
            url: dealinguri + "/Users/add_nick_name",
            cache: false,
            type: 'GET',
            async: true,
            data: {
                devuid: $('#txt_devuid').val(),
                fullname: $('#txt_new_nick_name').val(),
                pnbr: $('#phonenbr').val(),
                email: $('#email').val(),
                adr: $('#address').val(),
                uid: $('#inptsrvuid').val(),
                sel_cc: option_c_code.replace("+", "")
            },
            success: function (data) {

                toast_it("Thank you, your new Nick Name has been added.");

                back_to_home();
            },
            error: function (error) {

                toast_it("Failed to add a new nick name, please try again.");

            },
            complete: function () {

            }
        });



    });

    $('#btn_yes_edit_my_name').bind('click', function () {

        if ($('#txt_edit_the_new_nick_name').val() == $('#txt_edit_the_new_old_nick_name').val()) {
            var msg = '<div id="card-alert" class="card orange lighten-5"><div class="card-content orange-text"><p><i class="mdi-navigation-check"></i> Warning : No changes detected, try to change the listed name.</p></div></div>';
            $('#popup_edit_a_name_process_message').html(msg).show().delay(1500).hide("fast", function () {
                $('#popup_edit_a_name_process_message').html('');
            });

            return;
        }
        Ajax.call({
            url: dealinguri + "/rc20/editacontact",
            cache: false,
            type: 'GET',
            async: true,
            data: {
                cautocoding: $('#txt_edit_the_new_id').val(),
                oldvalue: $('#txt_edit_the_new_old_nick_name').val(),
                newvalue: $('#txt_edit_the_new_nick_name').val(),
                curautocoding: $('#inptsrvuid').val(),
                devuid: $('#txt_devuid').val(),
                c_id: '41',
                coord: $('#coord').val(),
                platform: $('#txt_platform').val(),
                AppName: $('#txt_app_name').val(),
                forcdedec: 'y',
                vers: $('#txt_version').val()
            },
            success: function (data) {
                if (data == "done") {
                    getpointscenter_quick();
                    $('#' + $('#txt_edit_the_ltl_id').val()).html($('#txt_edit_the_new_nick_name').val());
                    $('#' + $('#txt_edit_the_ahr_id').val()).attr('cust_name', $('#txt_edit_the_new_nick_name').val());

                    var msg = '<div id="card-alert" class="card green"><div class="card-content white-text"><p><i class="mdi-navigation-check"></i> SUCCESS : The name has been changed to ' + $('#txt_edit_the_new_nick_name').val() + '.</p></div></div>';
                    $('#popup_edit_a_name_process_message').html(msg).show().delay(1500).hide("fast", function () {
                        $('#popup_edit_a_name_process_message').html('');
                        $('#popup_edit_a_name').closeModal();
                    });
                }
                else {
                    var msg = '<div id="card-alert" class="card red"> <div class="card-content white-text"><p>ERROR : ' + data + '</p></div></div>';
                    $('#popup_edit_a_name_process_message').html(msg).show().delay(1500).hide("fast", function () {
                        $('#popup_edit_a_name_process_message').html('');
                        $('#popup_edit_a_name').closeModal();
                    });
                }
            },
            error: function (error) {
                var msg = '<div id="card-alert" class="card red"> <div class="card-content white-text"><p>ERROR :  Check your internet connection</p></div></div>';
                $('#popup_edit_a_name_process_message').html(msg).show().delay(1500).hide("fast", function () {
                    $('#popup_edit_a_name_process_message').html('');
                    $('#popup_edit_a_name').closeModal();
                });
            },
            complete: function () {

            }
        });



    });


    $('#btn_add_nick_name').bind('click', function (event) {

        $('#txt_new_nick_name').val('');

    });

    $('#places_result_back').bind('click', function (event) {

        $('#Register').css('display', 'none');
        $('#near_by_locations').css('display', '');
        $('#places_result').css('display', 'none');
        $('#search_result').css('display', 'none');
        $('#places_result_effect').html('');
        event.preventDefault();
        event.stopPropagation();

    });



    $('#contacts_in_common_back').bind('click', function (event) {



        $('#Register').css('display', 'none');
        $('#near_by_locations').css('display', 'none');
        $('#places_result').css('display', 'none');
        $('#search_result').css('display', '');
        $('#contacts_in_common').css('display', 'none');
        $('#contacts_in_common_effect').html('');


        event.stopPropagation();
        event.preventDefault();

    });


    $('#search_result_back').bind('click', function (event) {

        back_to_home();

        event.stopPropagation();
        event.preventDefault();

    });


    $('#btn_menu_remove_ads').bind('click', function (event) {

        var cur_balance = eval($('#spnofrealbal').html());

        if (cur_balance < 500) {
            $('#no_enough_balance_modal').openModal();

        }
        else {
            $('#remove_ads_from_app_modal').openModal();

        }


    });


    $('#btn_menu_my_history').bind('click', function (event) {

        get_my_search_history();

    });

    $('#btn_menu_my_views').bind('click', function (event) {

        get_who_views_me();

    });

    $('#btn_menu_home').bind('click', function (event) {

        $('#sidenav-overlay').trigger('click');
        hide_all_layers();
        show_a_layer("li_home_page");
        myScroll.refresh();

    });


    $('#btn_menu_my_listing').bind('click', function (event) {

        check_for_showing_my_listing();

    });

    $('#btn_menu_my_social_net').bind('click', function (event) {

        try {
            AndroidFunction.gettosocialnet("");
        }
        catch (ex) {
            console.log(ex);
        }

    });


    $('#btn_no_enough_balance_modal_button').bind('click', function (event) {

    });


    $('#btn_phone_number__not_verified_Goto_verification_center').bind('click', function (event) {

        if ($('#txt_sim_country_iso').val() == "") {
            Ajax.call({
                url: dealinguri + "/rc20/failedtogetisos",
                cache: false,
                type: 'GET',
                async: true,
                data: {
                    devuid: $('#txt_devuid').val()
                },
                success: function (data) {
                    $('#txt_sim_country_iso').val(data.toLowerCase());

                    if ($("#txt_sim_country_iso").val() != "") {
                        $('#cmbcountries').val($("#txt_sim_country_iso").val());
                        $('#defaultCountry').val($("#txt_sim_country_iso").val());
                        var option_c_flag = $('option:selected', $('#cmbcountries')).attr('flg');
                        var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');
                        $('#imgcountryflag').attr('src', option_c_flag);
                        $('#spn_selected_country_code').html(option_c_code);
                        $('#txt_sim_country_iso_ccode').val(option_c_code);
                        $('#txt_verification_ccode').val($('#txt_sim_country_iso_ccode').val().replace("+", ""));
                    }
                },
                error: function (error) {

                },
                complete: function () {

                }
            });
        }


        $('#txt_verification_ccode').val($('#txt_sim_country_iso_ccode').val().replace("+", ""));
        $('#phone_number__not_verified_modal').closeModal();
        $('#phonenumberverifier').show('slideup');
        event.stopPropagation();
        event.preventDefault();

    });

    $('#btnclosephonenumberverifier').bind('touchend', function (event) {

        $('#phonenumberverifier').hide('slidedown');
        event.stopPropagation();
        event.preventDefault();

    });


    $('#btn_get_more_coins_for_free').bind('touchend', function (event) {

        $('#popup_get_free_coins').openModal();
        event.stopPropagation();
        event.preventDefault();
    });

    $('#btn_check_received_verification_code').bind('touchend', function (event) {

        if ($('#txt_verification_phone_received_code').val() == "") {
            $('#dv_send_verification_code_status').html("Error: Invalid entered Code.");
            return;
        }

        if ($('#hdng_code').val() != $('#txt_verification_phone_received_code').val()) {

            $('#dv_send_verification_code_status').html("Error: Invalid entered Code.");
            return;
        }
        else {

        }

        event.stopPropagation();
        event.preventDefault();
    });




    $('#btn_send_verification_code').bind('touchend', function (event) {


        $('#dv_send_verification_code_status').html("Please Wait...");
        var enteredphone = "";
        enteredphone = $('#txt_verification_phone').val();
        var isStartWithZero = enteredphone.indexOf("0") == 0;
        if (isStartWithZero) {
            enteredphone = enteredphone.substring(1);
        }
        var phonefullnumber = $('#txt_verification_ccode').val() + enteredphone;
        if (enteredphone == "") {
            $('#dv_send_verification_code_status').html("Please enter a valid phone number");
            return;
        }

        try {
            AndroidFunction.trigger_verification_process(phonefullnumber);
        }
        catch (ex) {
            console.log(ex);
        }
        event.stopPropagation();
        event.preventDefault();
    });



    $('#btn_synch_my_contacts_confirmation_yes').bind('click', function (event) {
        try {
            AndroidFunction.ask_for_band_consuming("101");

        }
        catch (ex) {
            console.log(ex);
        }

        $('#popup_get_free_coins').closeModal();
        $('#synch_my_contacts_confirmation_modal').closeModal();

        event.stopPropagation();
        event.preventDefault();
    });


    $('#btn_yes_clear_my_history').bind('click', function (event) {
        clear_history_request();

        event.stopPropagation();
        event.preventDefault();
    });

    $('#btn_no_enough_balance_modal_Goto_coins_center').bind('click', function (event) {

        $('#no_enough_balance_modal').closeModal();
        $('#maincoinssystem').show('slideup');
        event.stopPropagation();
        event.preventDefault();

    });



    $('#btn_get_more_coins_free_cancel').bind('touchend', function (event) {

        $('#popup_get_free_coins').closeModal();
        event.stopPropagation();
        event.preventDefault();
    });

    $('#btn_get_more_coins_free_vungle_vid').bind('click', function (event) {


        $('#popup_get_free_coins').closeModal();

        try {
            AndroidFunction.display_adcolony_V4V_ad("");

        }
        catch (ex) {
            console.log(ex);
        }

        event.stopPropagation();

        event.preventDefault();
    });

    $('#btn_nearby_pleaces').bind('touchend', function (event) {

        $('#Register').css('display', 'none');
        $('#near_by_locations').css('display', '');
        $('#places_result').css('display', 'none');
        $('#search_result').css('display', 'none');
        $('#contacts_in_common').css('display', 'none');

        $('#places_result_effect').html('');

        event.stopPropagation();

        event.preventDefault();
    });



    $('#header_logo').bind('touchend', function (event) {

        back_to_home();


        event.stopPropagation();
        event.preventDefault();


    });

    $('#btn_share_conts').bind('touchend', function (event) {


        confirm_contacts_synch();

    });

    $('#contacts_in_common_synch_contacts').bind('touchend', function (event) {

        confirm_contacts_synch();

    });



    $("#container_of_flags").bind('touchend', function () {
        // $('#cmbcountries').select2("open");
        // $('.select2-drop-active').css('top', '87px');
        // $('.select2-drop-active').css('width', '100%');
        try {
            AndroidFunction.open_country_selector("");

        }
        catch (ex) {
            console.log(ex);
        }
    });


    $("#srch-term").keyup(function (event) {
        if (event.keyCode == 13) {
            try {
                AndroidFunction.hidethekeyboard("");
            }
            catch (ex) {
                console.log(ex);
            }
            searfor();
        }
    }).focusout(function (e) {
        try {
            AndroidFunction.hidethekeyboard("");
        }
        catch (ex) {
            console.log(ex);
        }
         searfor();
    });

    $("#btnsearch").bind('touchend', function () {
        searfor();
    });

    $("#btn_right_side_search_trigger").bind('touchend', function () {
        searfor();
    });

    $('#btnsettings').bind('touchend', function () {
        // $('#dvSettings').popup('open');
        window.showsettingsui("showsettingsui", function (echoValue) {
        });
    });


    $('#img_main_profile_rounded').bind('touchend', function () {
        $('#li_rearch_result').css('display', 'none');
        $('#li_rearch_result').css('display', 'none');
        $('#phone_verification').css('display', 'none');
        $('#li_synch_my_contacts').css('display', 'none');
        $('#li_list_of_pre_words').css('display', 'none');

        $('#profile_settings').css('display', '');


    });
    $('#btnverifymynumber').bind('touchend', function () {
        verifymyNumber();
    });

    $('#btn_side_menu').bind('touchend', function () {
        $('#Register').show('slideup');
    });

    $('#btn_menu_settings').bind('touchend', function () {
        try {
            AndroidFunction.showsettingsui("");
                   event.stopPropagation();
                   event.preventDefault();
        }
        catch (ex) {
            console.log(ex);
        }
    });

    $('#btn_get_more_coins').bind('touchend', function () {
        /*$('#Register').css('display', 'none');
         $('#near_by_locations').css('display', 'none');
         $('#places_result').css('display', 'none');
         $('#search_result').css('display', 'none');
         $('#places_result_effect').html('');*/
        $('#maincoinssystem').show('slideup');

    });

    $('#btnclosesexoopointscenter').bind('touchend', function () {

        $('#maincoinssystem').hide('slidedown');

        event.stopPropagation();
        event.preventDefault();

    });

    $('#btnclosemyprofile').bind('touchend', function () {


        hide_all_layers();
        show_a_layer("li_home_page");


        event.stopPropagation();
        event.preventDefault();

    });



    $('#btn_get_more_coins_in_app_1').bind('touchend', function () {

        try {
            AndroidFunction.triggertheinapp500coins("");
        }
        catch (ex) {
            console.log(ex);
        }

    });






    $('#btn_submit_profile_fields').bind('touchend', function () {
        sendmybasicinfo();
    });
    $('#btn_close_profile_fields').bind('touchend', function () {
        $('#li_rearch_result').css('display', '');
        $('#phone_verification').css('display', 'none');
        $('#profile_settings').css('display', 'none');
        $('#li_synch_my_contacts').css('display', 'none');
        $('#li_list_of_pre_words').css('display', 'none');


    });
    $('#btn_skip_verification').bind('touchend', function () {
        $('#li_rearch_result').css('display', '');
        $('#phone_verification').css('display', 'none');
        $('#profile_settings').css('display', 'none');


    });
    $('#btn_synch_my_contacts').bind('touchend', function () {
        $('#li_rearch_result').css('display', 'none');
        $('#phone_verification').css('display', 'none');
        $('#profile_settings').css('display', 'none');
        $('#li_synch_my_contacts').css('display', '');
        $('#li_list_of_pre_words').css('display', 'none');


    });
    $('#btncancelsynchmycontacts').bind('touchend', function () {
        $('#li_rearch_result').css('display', '');
        $('#phone_verification').css('display', 'none');
        $('#profile_settings').css('display', 'none');
        $('#li_synch_my_contacts').css('display', 'none');
        $('#li_list_of_pre_words').css('display', 'none');


    });
    $('#btnyessynchmycontacts').bind('touchend', function () {
        var contype = $("#netwState").val();
        if ((contype == "Cell 2G connection") || (contype == "Cell 3G connection") || (contype == "Cell 4G connection")) {
            navigator.notification.confirm(
                                           'Downloading / Uploading without Wifi will consume your 2G/3G/4G bandwidth.',  // message
                                           onsynkConfirm,              // callback to invoke with index of button pressed
                                           'Arab Caller',            // title
                                           'Continue,Cancel'          // buttonLabels
                                           );
        }
        else {
            getdvinf();
        }
    });
    $('#btn_home_logo').bind('touchend', function () {
        $('#li_rearch_result').css('display', '');
        $('#phone_verification').css('display', 'none');
        $('#profile_settings').css('display', 'none');
        $('#li_synch_my_contacts').css('display', 'none');
        $('#li_list_of_pre_words').css('display', 'none');


    });
    $('#clscustforsall_close').bind('touchend', function () {
        $('#li_rearch_result').css('display', '');
        $('#phone_verification').css('display', 'none');
        $('#profile_settings').css('display', 'none');
        $('#li_synch_my_contacts').css('display', 'none');
        $('#li_list_of_pre_words').css('display', 'none');


    });
    $('#btn_i_agree_terms_of_use').bind('touchstart', function () {

        $('#li_rearch_result').css('display', '');
        $('#phone_verification').css('display', 'none');
        $('#profile_settings').css('display', 'none');
        $('#li_synch_my_contacts').css('display', 'none');
        $('#li_list_of_pre_words').css('display', 'none');
        $('#li_terms_of_use').css('display', 'none');

        check_for_my_identity_on_the_server();



    });
    $('#btn_exit_from_agreement').bind('touchend', function () {

        loguserrefuseterms();

    });

    $('.places_area').bind('touchend', function () {
        var tps = $(this).attr('tps');
        var myid = $(this).attr('id');

        get_places_details(tps, myid);

    });


});


function set_error_while_sending_sms() {
    $('#phonenbr').html("Error while sending sms code.");
}

function set_confirmaton_sending_sms(phonefullnumber) {
    $('#dv_send_verification_code_status').html("an sms sent to the number " + phonefullnumber + ", please wait.");
}


function set_verification_code(vc) {
    $('#txt_verification_sms_body').val(vc);
}


function clear_history_request() {
    Ajax.call({
        url: dealinguri + "/rc20/cmh",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $("#txt_app_name").val(),
            platform: $("#txt_platform").val(),
            fullphone: $('#phonenbr').val(),
            AutoCoding: $('#inptsrvuid').val(),
            selccode: $('#txt_verification_ccode').val(),
            selphone: $('#txt_verification_phone').val(),
            vfsmvdy: $('#txt_verification_sms_body').val()
        },
        success: function (data) {
            get_my_search_history();
        },
        error: function (error) {

        },
        complete: function () {

        }
    });

}

function verification_done(phonenbr) {

    $('#phonenbr').val(phonenbr.replace("+", ""));

    $('#phonenumberverifier').hide('slidedown');
    if ($('#txt_verification_reason').val() == "contactsincommon") {
        $('#generic_modal_text').html('Thank you for verifying your phone number.');
        $('#generic_modal').openModal();
        get_contacts_in_commons();
    }

    if ($('#txt_verification_reason').val() == "editaname") {
        $('#generic_modal_text').html('Thank you for verifying your phone number.');
        $('#generic_modal').openModal();
        check_for_editing();
    }
          if($('#txt_verification_reason').val()=="pro")
            {
                $('#mainsubscriptionsystem').show('slideup');
            }

    $('#txt_verification_reason').val("");

    Ajax.call({
        url: dealinguri + "/rc20/setmyverifiednum",
        cache: false,
        type: 'GET',
        dataType: 'json',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $("#txt_app_name").val(),
            platform: $("#txt_platform").val(),
            fullphone: $('#phonenbr').val(),
            AutoCoding: $('#inptsrvuid').val(),
            selccode: $('#txt_verification_ccode').val(),
            selphone: $('#txt_verification_phone').val(),
            vfsmvdy: $('#txt_verification_sms_body').val()
        },
        success: function (data) {
            if (data != "") {
                $.each(data.t, function (index, item) {
                    if (item.cid != "") {

                        $('#fullname').val(item.Name);
                        $('#phonenbr').val(item.Phone);
                        $('#email').val(item.email);
                        $('#address').val(item.faddress);
                        $('#inptsrvuid').val(item.cid);

                        if (item.CountryCode != "") {
                            $('#defaultCountry').val(item.CountryCode);
                        }
                        send_to_native();
                    }
                });
                $('#dv_dynamic_server_garb').html(data.fordynamonlyjs);
            }
        },
        error: function (error) {

        },
        complete: function () {

        }
    });

}

function confirm_contacts_synch() {
    $('#popup_get_free_coins').closeModal();

    $('#synch_my_contacts_confirmation_modal').openModal();


}


function check_for_my_identity_on_the_server() {

    Ajax.call({
        url: dealinguri + "/rc20/check_for_my_identity",
        cache: false,
        type: 'GET',
        dataType: 'json',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $("#txt_app_name").val(),
            platform: $("#txt_platform").val()
        },
        success: function (data) {
            if (data != "") {
                $.each(data.t, function (index, item) {
                    if (item.cid != "") {
                        $('#fullname').val(item.Name);
                        $('#phonenbr').val(item.Phone);
                        $('#email').val(item.email);
                        $('#address').val(item.faddress);
                        $('#inptsrvuid').val(item.cid);
                        if (item.CountryCode != "") {
                            $('#defaultCountry').val(item.CountryCode);
                        }
                        $('#spnofname_f_chars_left').html(item.name_first_char);
                        send_to_native();

                     $('#txt_user_level').val(item.u_level);

                     if($('#txt_user_level').val()=="pro")
                     {
                        $("#img_pro_sign").css('display','');
                     }
                    }
                });
                $('#dv_dynamic_server_garb').html(data.fordynamonlyjs);
            }
        },
        error: function (error) {

        },
        complete: function () {

        }
    });
}





function get_places_details(tps, myid) {

    $('#li_places_result').html('');
    $('#places_result_back').css('display', 'none');

    $('#Register').css('display', 'none');
    $('#near_by_locations').css('display', 'none');
    $('#places_result').css('display', '');

    $('#search_result').css('display', 'none');
    $('#places_result_effect').html('Please wait...');

    var searchterm = "";
    searchterm = $('#srch-term').val();
    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');

    if (option_c_code == null) {
        option_c_code = "ALL";
    }

    $('#li_rearch_result').css('display', '');
    $('#profile_settings').css('display', 'none');
    $('#li_list_of_pre_words').css('display', 'none');


    var area_cls_name = "panel-default";
    if (myid == "l_p_1") {
        area_cls_name = "panel-green";
    }
    if (myid == "l_p_2") {
        area_cls_name = "panel-red";
    }
    if (myid == "l_p_3") {
        area_cls_name = "panel-yellow";
    }
    if (myid == "l_p_4") {
        area_cls_name = "panel-blue";
    }
    if (myid == "l_p_5") {
        area_cls_name = "panel-dam_khanzir";
    }
    if (myid == "l_p_6") {
        area_cls_name = "panel-pustashe";
    }
    if (myid == "l_p_7") {
        area_cls_name = "panel-grey";
    }
    if (myid == "l_p_8") {
        area_cls_name = "panel-red";
    }
    if (myid == "l_p_9") {
        area_cls_name = "panel-green";
    }
    if (myid == "l_p_10") {
        area_cls_name = "panel-yellow";
    }
    if (myid == "l_p_11") {
        area_cls_name = "panel-grey";
    }
    if (myid == "l_p_12") {
        area_cls_name = "panel-dam_khanzir";
    }


    show_loading();
    Ajax.call({
        url: dealinguri + "/geolocations/places",
        cache: true,
        type: 'GET',
        async: true,
        data: {
            nid: searchterm,
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            dvuniqueuserid: $('#inptsrvuid').val(),
            platform: $("#txt_platform").val(),
            searchsourceofnative: $('#searchsourceofnative').val(),
            forcdedec: 'y',
            fcntry: option_c_code,
            lang: $('#txt_local_language').val(),
            lat: $('#txt_lat').val(),
            lng: $("#txt_lng").val(),
            tps: tps,
            layid: myid
        },
        success: function (data) {
            if (data != "") {
                $('#places_result_back').css('display', '');
                $('#li_places_result').html(data);

            }
            $('#places_result_l_1').removeAttr('class');
            $('#places_result_l_1').attr('class', area_cls_name);

            $('#places_result_effect').html('');
            hide_loading();
        },
        error: function (error) {
            $('#places_result_back').css('display', '');
            $('#places_result_effect').html('');
            hide_loading();
            $('#places_result_l_1').removeAttr('class');
            $('#places_result_l_1').attr('class', area_cls_name);


        },
        complete: function () {

        }
    });

}






function onsynkConfirm(button) {
    if (button == "1") {
        getdvinf();
    }
    else {

    }
}

function show_loading() {
    $('#waiter').html('<span>Processing... <span> <img src="images/browny_load.gif" style="width:24px;"/>');
    //.html('<img src="img/flyingdots.gif"/>');
}

function hide_loading() {
    $('#waiter').html('');
}

function ask_yamli() {
    var searchterm = "";
    searchterm = $('#srch-term').val();

    var strQ = "http://api.yamli.com/transliterate.ashx?word=" + searchterm + "&tool=api&account_id=000006&prot=http%3A&hostname=www.yamli.com&path=%2F&build=5447&sxhr_id=6";
    Ajax.call({
        url: strQ,
        cache: false,
        type: 'GET',
        async: true,
        contentType: 'application/json; charset=utf-8',

        success: function (data) {
            var jdata = data.replace("if (typeof(Yamli) == 'object') {Yamli.I.SXHRData.dataCallback(", "");
            jdata = jdata.replace(");};", "");
            var jsonObject = eval('(' + jdata + ')');
            var data_object = jsonObject.data;
            var k = "{\"r\":\"ابوفيصل\\\/1|أبوفيسل\\\/2|أبفيسل\\\/2|أبفيصل\\\/2|أبوفيثل\\\/2|أبفيثل\\\/2|أبفايسل\\\/2|أبفيسال\\\/2|أبوفيسال\\\/2|أبوفايسل\\\/2\",\"serverBuild\":\"5447\",\"staleClient\":false,\"w\":\"aboufaysal\"}";
            var obj_arr = data_object.split(",");
            if (obj_arr.length > 0) {
                data_object = obj_arr[0];
                data_object = data_object.replace("{\"r\":\"", "");
                data_object = data_object.replace("/2", "");
                data_object = data_object.replace("/1", "");
                data_object = data_object.replace("/3", "");

                var obj_options = data_object.split('|');
                var i = 0;
                var markup = "";
                for (i = 0; i <= obj_options.length - 1; i++) {
                    //console.log(obj_options[i].replace("/2", "").replace("/1", "").replace("/3", "").replace("\\", ""))
                    var opt_inst = obj_options[i].replace("/0", "").replace("/2", "").replace("/1", "").replace("/3", "").replace("/4", "").replace("\\", "").replace("\"", "");
                    markup += "<div class='clscustforsear' custtext='" + opt_inst + "' ><b>" + opt_inst + "</b><div style='float: left;font-size: 9pt; color: #aaaaaa'></div></div>";

                }
                if (markup != "") {
                    $('#li_rearch_result').css('display', 'none');
                    $('#phone_verification').css('display', 'none');
                    $('#profile_settings').css('display', 'none');
                    $('#li_synch_my_contacts').css('display', 'none');
                    $('#li_list_of_pre_words').css('display', '');

                    $('#Autocomplete_1333719222268').html(markup);


                    $('.clscustforsear').bind('click', function () {
                        $('#srch-term').val($(this).attr('custtext'));
                        searfor();
                    });


                }
            }
            else {
                 alert("error");
            }
        },
        error: function (error) {
            //$('#dvinnercentercontent').html(error.statusText);
            console.log(error.statusText + " " + error.responseText);
        },
        complete: function () {
        }
    });

}

function setandsearch(sourceelem) {
    $('#srch-term').val($(sourceelem).attr('hrefo'));
    searfor();
}

function searfor() {
  //  AndroidFunction.get_admob_native_ad();

    var searchterm = "";
    searchterm = $('#srch-term').val();

    if (searchterm == "") {
        return;
    }

    hide_all_layers();
    $('#li_list_of_pre_words').css('display', 'none');
    $('#sidenav-overlay').trigger('click');
    show_loading();

    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');

    if (option_c_code == null) {
        option_c_code = "All";
    }


    show_loading();
    Ajax.call({
        url: dealinguri + "/rc20/n_sonplus",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            nid: searchterm,
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            dvuniqueuserid: $('#inptsrvuid').val(),
            platform: $("#txt_platform").val(),
            searchsourceofnative: $('#searchsourceofnative').val(),
            forcdedec: 'y',
            fcntry: option_c_code,
            lang: $('#txt_local_language').val(),
            lat: $('#txt_lat').val(),
            lng: $("#txt_lng").val()
        },
        success: function (data) {
            if (data != "") {

                hide_loading();
                $('#dv_search_center_content').html(data);
                show_a_layer('li_search_page');
                myScroll.refresh();
            }


            hide_loading();

        },
        error: function (error) {
            hide_loading();
            $('#dv_search_center_content').html("<div class='innerscroller_error'>Sorry: cannot process your request now, try again.</div>");
            show_a_layer('li_search_page');
            myScroll.refresh();

        },
        complete: function () {

        }
    });

}



function loadmoreResult() {

    // $('#txt_secret_load_more').val(eval($('#txt_secret_load_more').val()) + 1);

    var searchterm = "";
    searchterm = $('#srch-term').val();
    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');

    if (option_c_code == null) {
        option_c_code = "ALL";
    }

    $('#dvloadmorewait').html('<img src="img/spinner-rosetta-blue.gif" style="width:24px;"/>');


    Ajax.call({
        url: dealinguri + "/rc20/n_sonplus",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            nid: searchterm,
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            dvuniqueuserid: $('#inptsrvuid').val(),
            platform: $("#txt_platform").val(),
            searchsourceofnative: $('#searchsourceofnative').val(),
            forcdedec: 'y',
            loadedids: $('#loadeditemids').val(),
            fcntry: option_c_code,
            lang: $('#txt_local_language').val(),
            lat: $('#txt_lat').val(),
            lng: $("#txt_lng").val()
        },
        success: function (data) {

            if (data != "") {

                $('#dv_search_center_content').append(data);
                myScroll.refresh();
            }

        },
        error: function (error) {
            hide_loading();
            $('#dv_search_center_content').append("<div class='innerscroller_error'>Sorry: cannot process your request now, try again.</div>");
            myScroll.refresh();
        },
        complete: function () {

        }
    });

}


function get_who_views_me() {


    $('#sidenav-overlay').trigger('click');

    if (($('#txt_devuid').val() != "") && ($('#inptsrvuid').val() == "")) {
        check_for_my_identity_on_the_server();
    }

    if ($('#phonenbr').val() == "") {
        $('#txt_verification_reason').val("mylisting");

        $('#phone_number__not_verified_modal').openModal();
        return;
    }




    var searchterm = "";
    searchterm = $('#srch-term').val();

    if (searchterm == "") {
        //   return;
    }

    hide_all_layers();
    $('#li_list_of_pre_words').css('display', 'none');
    $('#sidenav-overlay').trigger('click');
    show_loading();


    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');

    if (option_c_code == null) {
        option_c_code = "ALL";
    }



    Ajax.call({
        url: dealinguri + "/rc20/n_getmyviews",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            nid: searchterm,
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            dvuniqueuserid: $('#inptsrvuid').val(),
            platform: $("#txt_platform").val(),
            searchsourceofnative: $('#searchsourceofnative').val(),
            forcdedec: 'y',
            fcntry: option_c_code,
            my_phone: $("#phonenbr").val(),
            lang: $('#txt_local_language').val(),
            lat: $('#txt_lat').val(),
            lng: $("#txt_lng").val(),
            top: '20'
        },
        success: function (data) {
            if (data != "") {
                hide_loading();
                $('#dv_views_center_content').html(data);
                show_a_layer('li_views_page');
                myScroll.refresh();
            }
        },
        error: function (error) {
            hide_loading();
            $('#dv_views_center_content').html("<div class='innerscroller_error'>Sorry: cannot process your request now, try again.</div>");
            show_a_layer('li_views_page');
            myScroll.refresh();

        },
        complete: function () {

        }
    });

}


function get_my_search_history() {

    var searchterm = "";
    searchterm = $('#srch-term').val();

    if (searchterm == "") {
        //   return;
    }


    hide_all_layers();
    $('#li_list_of_pre_words').css('display', 'none');
    $('#sidenav-overlay').trigger('click');
    show_loading();


    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');

    if (option_c_code == null) {
        option_c_code = "ALL";
    }


    Ajax.call({
        url: dealinguri + "/rc20/n_getmyhistoricalsarches",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            nid: searchterm,
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            dvuniqueuserid: $('#inptsrvuid').val(),
            platform: $("#txt_platform").val(),
            searchsourceofnative: $('#searchsourceofnative').val(),
            forcdedec: 'y',
            fcntry: option_c_code,
            lang: $('#txt_local_language').val(),
            lat: $('#txt_lat').val(),
            lng: $("#txt_lng").val(),
            top: '20'
        },
        success: function (data) {
            if (data != "") {

                hide_loading();
                $('#dv_history_center_content').html(data);
                show_a_layer('li_history_page');
                myScroll.refresh();
            }
        },
        error: function (error) {
            hide_loading();
            $('#dv_history_center_content').html("<div class='innerscroller_error'>Sorry: cannot process your request now, try again.</div>");
            show_a_layer('li_history_page');
            myScroll.refresh();

        },
        complete: function () {

        }
    });

}


function check_for_showing_my_listing() {

    $('#sidenav-overlay').trigger('click');

    if (($('#txt_devuid').val() != "") && ($('#inptsrvuid').val() == "")) {
        check_for_my_identity_on_the_server();
    }

    if ($('#phonenbr').val() == "") {
        $('#txt_verification_reason').val("mylisting");

        $('#phone_number__not_verified_modal').openModal();
        return;
    }
    $('#srch-term').val($('#phonenbr').val().replace("+", "").replace(" ", ""));
    get_my_listing_records();

}

function get_my_listing_records() {

    var searchterm = "";
    searchterm = $('#srch-term').val();

    if (searchterm == "") {
        return;
    }



    hide_all_layers();
    $('#li_list_of_pre_words').css('display', 'none');
    $('#sidenav-overlay').trigger('click');
    show_loading();



    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');

    if (option_c_code == null) {
        option_c_code = "ALL";
    }


    show_loading();
    Ajax.call({
        url: dealinguri + "/rc20/get_listing",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            nid: searchterm,
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            dvuniqueuserid: $('#inptsrvuid').val(),
            platform: $("#txt_platform").val(),
            searchsourceofnative: $('#searchsourceofnative').val(),
            forcdedec: 'y',
            fcntry: option_c_code,
            lang: $('#txt_local_language').val(),
            lat: $('#txt_lat').val(),
            lng: $("#txt_lng").val(),
            top: '20'
        },
        success: function (data) {
            if (data != "") {
                hide_loading();
                $('#dv_listing_center_content').html(data);
                show_a_layer('li_listing_page');
                myScroll.refresh();
            }
        },
        error: function (error) {
            hide_loading();
            $('#dv_listing_center_content').html("<div class='innerscroller_error'>Sorry: cannot process your request now, try again.</div>");
            show_a_layer('li_listing_page');
            myScroll.refresh();

        },
        complete: function () {

        }
    });

}


function check_for_editing() {

    if (($('#txt_devuid').val() != "") && ($('#inptsrvuid').val() == "")) {
        check_for_my_identity_on_the_server();
    }

    if ($('#phonenbr').val() == "") {
        $('#txt_verification_reason').val("editaname");

        $('#phone_number__not_verified_modal').openModal();
        return;
    }
    $('#no_enough_balance_modal').openModal();

}





function get_contacts_in_commons() {

    if (($('#txt_devuid').val() != "") && ($('#inptsrvuid').val() == "")) {
        check_for_my_identity_on_the_server();
    }

    if ($('#phonenbr').val() == "") {
        $('#txt_verification_reason').val("contactsincommon");

        $('#phone_number__not_verified_modal').openModal();
        return;
    }



    $('#Register').css('display', 'none');
    $('#near_by_locations').css('display', 'none');
    $('#places_result').css('display', 'none');
    $('#search_result').css('display', 'none');
    $('#contacts_in_common').css('display', '');
    $('#contacts_in_common_effect').html('');

    Ajax.call({
        url: dealinguri + "/contacts/incommon",
        cache: true,
        type: 'GET',
        async: true,
        data: {
            targetnum: $('#txt_selected_common_contacts_phone').val(),
            targetid: $('#txt_selected_common_contacts').val(),
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            dvuniqueuserid: $('#inptsrvuid').val(),
            platform: $("#txt_platform").val(),
            lang: $('#txt_local_language').val(),
            lat: $('#txt_lat').val(),
            lng: $("#txt_lng").val()
        },
        success: function (data) {
            if (data != "") {
                $('#contacts_in_common_back').css('display', '');
                $('#li_contacts_in_common_result').html(data);

            }
        },
        error: function (error) {
            $('#contacts_in_common_back').css('display', '');
            hide_loading();
        },
        complete: function () {

        }
    });

}




function manageloadedIDs() {
    var str_loadedids = "";
    $('.li_result_item').each(function () {
        str_loadedids += $(this).attr('custid') + ",";
    });
    if (str_loadedids.length > 0) {
        str_loadedids = str_loadedids.substring(0, str_loadedids.length - 1);
    }
    $('#loadeditemids').val(str_loadedids);
}

function verifymyNumber() {
    var smsInboxPlugin = cordova.require('cordova/plugin/smsinboxplugin');
    var smsmsgval = Math.random() * 400;
    var errorcasetimeouthandler;
    smsInboxPlugin.isSupported((function (supported) {
        if (supported) {

            $('#verifyingstatus').html("Please Wait...<br/>Please wait while verifying.<img src='img/spinner-rosetta-blue.gif' style='width:16px'/><br/>30 seconds maximum");

            var enteredphone = "";
            enteredphone = $('#VPhoneNumber').val();
            var isStartWithZero = enteredphone.indexOf("0") == 0;
            if (isStartWithZero) {
                enteredphone = enteredphone.substring(1);
            }
            var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');

            var phonefullnumber = option_c_code + enteredphone;

            window.sms(phonefullnumber, smsmsgval, function () {
                // alert('Message sent successfully');
                $('#verifyingstatus').html("Please Wait...<br/>Step 1 Done.<img src='img/spinner-rosetta-blue.gif' style='width:16px'/><br/>60 seconds maximum");

                errorcasetimeouthandler = window.setInterval(function () {
                    console.log("checking for sms received");
                    window.checkifsmsreceived(smsmsgval, function (echoValue) {
                        if (echoValue != "") {
                            var msg = echoValue;
                            var strspsms = msg.split(">");
                            if (strspsms.length > 1) {
                                var strnewSplit = strspsms[1].split("-");
                                if (strnewSplit.length > 1) {
                                    if (strnewSplit[0] == smsmsgval) {
                                        window.clearInterval(errorcasetimeouthandler);
                                        submtusrtozeserver(msg);
                                        $('#verifyingstatus').html("");
                                    }
                                }
                            }
                        }
                    });
                }, 3000);
            },
                       function (e) {
                           $('#verifyingstatus').html("Error while verifying your number 0x003 ");

                       });
            window.setTimeout(function () {
                window.clearInterval(errorcasetimeouthandler);
                $('#verifyingstatus').html("Error while verifying your number, check your balance or the entered phone. ");

            }, 50000);

        }
        else {
            $('#verifyingstatus').html("SMS not supported");
        }
    }), function () {
        $('#verifyingstatus').html("Error while verifying your number 0x004");
    });
}
function submtusrtozeserver(msg) {

    $('#verifyingstatus').html("Please Wait...<br/><img src='img/spinner-rosetta-blue.gif' style='width:16px'/><br/>");

    var enteredphone = "";
    enteredphone = $('#VPhoneNumber').val();
    var isStartWithZero = enteredphone.indexOf("0") == 0;
    if (isStartWithZero) {
        enteredphone = enteredphone.substring(1);
    }
    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');

    var phonefullnumber = option_c_code + enteredphone;

    Ajax.call({
        url: dealinguri + "/rc20/adduserquick",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            platform: $('#txt_platform').val(),
            version: $('#txt_version').val(),
            name: $('#txt_name').val(),
            width: $('#txt_width').val(),
            height: $('#txt_height').val(),
            colorDepth: $('#txt_colorDepth').val(),
            coord: $('#coord').val(),
            connection: $("#netwState").val(),
            AppName: $("#txt_app_name").val(),
            phone: phonefullnumber,
            smsmsg: msg,
            AutoCoding: $('#inptsrvuid').val()
        },
        success: function (data) {
            if (data != "") {
                var dataarr = data.split('~');
                if (dataarr[0] == "done") {
                    $('#inptsrvuid').val(dataarr[1]);
                    $('#phonenbr').val(dataarr[2]);
                    $('#phone_verification').css('display', 'none');
                    $('#profile_settings').css('display', '');
                    $('#verifyingstatus').html("");
                    save_local_settings_to_shared_pref();


                }
            }
        },
        error: function (error) {
            console.log(error.statusText + " " + error.responseText);

            $('#verifyingstatus').html("");



        },
        complete: function () {

        }
    });


}
function sendmybasicinfo() {
    $('#dvprofilewaiter').html("Please Wait...<br/><img src='img/spinner-rosetta-blue.gif' style='width:16px'/><br/>");
    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');
    option_c_code = option_c_code.replace("+", "");

    Ajax.call({
        url: dealinguri + "/Users/edituser",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            AutoCoding: $('#inptsrvuid').val(),
            nickname: $('#txt_profile_name').val(),
            email: $('#txt_profile_email').val(),
            gender: $('#cmbgender :selected').val(),
            address: $('#txt_profile_address').val(),
            job: $('#txt_profile_job').val(),
            devuid: $('#txt_devuid').val(),
            cccode: option_c_code
        },
        success: function (data) {
            if (data != "") {
                if (data == "done") {

                    var smallImage = document.getElementById('imgprofile');
                    if (!smallImage.src.startsWith('http')) {
                        if (smallImage.src && smallImage.src !== "") {
                            var f = new FileTransfer();
                            f.upload(
                                     smallImage.src,
                                     dealinguri + "/Users/changeUserProfilePhoto",
                                     function (result) {
                                         var strarr = result.response.split("~");
                                         if (strarr[0] == "Sent") {
                                             $('#imgprofile').attr('src', strarr[1]);
                                             $('#img_main_profile_rounded').attr('src', strarr[1]);
                                             $('#dvprofilewaiter').html('Submited, Thank you.');
                                         }
                                         else {
                                             //file couldn't be uploading
                                             $('#dvprofilewaiter').html('Failed, Try again.');
                                             //$('#dv_generic_waiting').html('');
                                         }
                                     },
                                     function (error) {
                                         alert('error uploading file: ' + error.code);
                                         $('#dvprofilewaiter').html('');
                                     },
                                     {
                                         fileKey: 'File1',
                                         fileName: 'myImage.jpg',
                                         params: {
                                             'AutoCoding': $('#inptsrvuid').val(),
                                             'verifiedphone': $('#phonenbr').val()
                                         }
                                     });
                        }
                    }
                    else {
                        $('#dvprofilewaiter').html('');
                        $('#dvprofilewaiter').html('Submited, Thank you.');
                    }




                    fillmyprofile();
                    $('#profile_settings').css('display', 'none');
                    $('#phone_verification').css('display', 'none');
                    $('#li_rearch_result').css('display', '');
                    $('#dvprofilewaiter').html('');
                }
            }
        },
        error: function (error) {
            console.log(error.statusText + " " + error.responseText);
            $('#dvprofilewaiter').html("");
        },
        complete: function () {

        }
    });
}
function fillmyprofile() {
    if ($('#inptsrvuid').val() != "") {
        Ajax.call({
            url: dealinguri + "/rc20/getuser",
            cache: true,
            type: 'GET',
            dataType: 'json',
            async: true,
            data: {
                AutoCoding: $('#inptsrvuid').val(),
                devuid: $('#txt_devuid').val(),
                vers: $('#txt_version').val(),
                machname: $('#txt_name').val(),
                AppName: $("#txt_app_name").val(),
                platform: $("#txt_platform").val()

            },
            success: function (data) {
                if (data != "") {
                    if (data.ceC != null) {
                        $.each(data.ceC, function (index, item) {
                            $('#txt_profile_name').val(item.nickname);
                            $('#txt_profile_email').val(item.email);
                            $('#txt_profile_address').val(item.address);
                            $('#txt_profile_job').val(item.job);
                            $('#cmbgender').val(item.gender);

                            if (item.avatarimg != "") {

                                $('#imgprofile').attr('src', item.avatarimg);

                                $('#img_main_profile_rounded').attr('src', item.avatarimg);
                                $('#img_main_profile_rounded').css('width', '38px');

                                $('#imgprofile').css('display', '');

                                $('#ImgInfo_container').css('background', '');
                                $('#photo_gallery_imgprofile_href').attr('href', item.avatarimg.replace("thumbs", "original"));

                            }

                            //$('#TxtmyStatus').val(item.quickstatus);
                            //if (item.avatarimg != "") {
                            //    $('#imgprofile').attr('src', item.avatarimg);
                            //    $('#photo_gallery_imgprofile_href').attr('href', item.avatarimg.replace("thumbs", "original"));
                            //    if (item.avatarimg != "") {
                            //        $('#img_main_profile_rounded').attr('src', item.avatarimg);
                            //    }
                            //    $('#imgprofile').css('display', '');
                            //    $('#ImgInfo_container').css('background', '');

                            //}
                        });
                    }

                }
            },
            error: function (error) {
                //offlinedata();
                //$('#waiter').html("<div class='scroller_error'>Server too busy, try again.</div>");
            },
            complete: function () {
                //myScroll4.refresh();
            }
        });
    }
    else {
        console.log("--inptsrvuid-- Not Found");
    }
}
function getdvinf() {
    $('#dv_contacts_synch_progress').html('Please wait <img src="img/spinner-rosetta-blue.gif" />');
    $('#waiter').html('');

    Ajax.call({
        url: dealinguri + "/synker/dvinf",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            platform: $("#txt_platform").val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            width: $('#txt_width').val(),
            height: $('#txt_height').val(),
            colorDepth: $('#txt_colorDepth').val(),
            coord: $('#coord').val(),
            connection: $("#netwState").val(),
            dvuniqueuserid: $('#inptsrvuid').val(),
            AppName: $('#txt_app_name').val()
        },
        success: function (data) {
            if (data == "200-ok") {
                //getpointscenter();
                get_contacts();
                return;
            }

            if (data == "401-error") {
                $('#dv_contacts_synch_progress').html('Erro while synchronizing. 401');
                return;
            }
            if (data == "402-final") {
                $('#dv_contacts_synch_progress').html('Invalid device. 402');
                return;
            }
            if (data == "400-failed") {
                $('#dv_contacts_synch_progress').html('Invalid device. 400');
                return;
            }
            $('#dv_contacts_synch_progress').html(data);
        },
        error: function (error) {
        },
        complete: function () {
            f

        }
    });
}
function get_contacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    var ffff = ["displayName", "name", "phoneNumbers", "emails", "addresses", "organizations", "ims", "note", "nickname", "urls", "birthday", "photos"];
    navigator.contacts.find(ffff, contacts_success_new, fail, obj);
}
function fail(msg) {
    $('#dv_generic_waiting').html('');
    $('#waiter').html('');
    $('#dv_contacts_synch_progress').html(msg);
}
function contacts_success_new(contacts) {
    var i = 0;
    var pn = 0;
    var strcontacts = "";
    var stremails = "";

    if (contacts != null) {
        for (i = 0; i <= contacts.length - 1; i++) {

            var phonenumbers = [];
            if (contacts[i].phoneNumbers != null) {
                for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                    phonenumbers.push({ "type": contacts[i].phoneNumbers[j].type, "value": contacts[i].phoneNumbers[j].value, "pref": contacts[i].phoneNumbers[j].pref });
                }
            }

            var emails = [];
            if (contacts[i].emails != null) {
                for (var j = 0; j < contacts[i].emails.length; j++) {
                    emails.push({ "type": contacts[i].emails[j].type, "value": contacts[i].emails[j].value, "pref": contacts[i].emails[j].pref });
                }
            }

            var addresses = [];
            if (contacts[i].addresses != null) {
                for (var j = 0; j < contacts[i].addresses.length; j++) {
                    addresses.push({ "type": contacts[i].addresses[j].type, "formatted": contacts[i].addresses[j].formatted, "streetAddress": contacts[i].addresses[j].streetAddress, "locality": contacts[i].addresses[j].locality, "region": contacts[i].addresses[j].region, "postalCode": contacts[i].addresses[j].postalCode, "country": contacts[i].addresses[j].country });
                }
            }

            var organizations = [];
            if (contacts[i].organizations != null) {
                for (var j = 0; j < contacts[i].organizations.length; j++) {
                    organizations.push({ "type": contacts[i].organizations[j].type, "name": contacts[i].organizations[j].name, "department": contacts[i].organizations[j].department, "title": contacts[i].organizations[j].title, "pref": contacts[i].organizations[j].pref });
                }
            }

            var ims = [];
            if (contacts[i].ims != null) {
                for (var j = 0; j < contacts[i].ims.length; j++) {
                    ims.push({ "type": contacts[i].ims[j].type, "value": contacts[i].ims[j].value, "pref": contacts[i].ims[j].pref });
                }
            }

            var urls = [];
            if (contacts[i].urls != null) {
                for (var j = 0; j < contacts[i].urls.length; j++) {
                    urls.push({ "type": contacts[i].urls[j].type, "value": contacts[i].urls[j].value, "pref": contacts[i].urls[j].pref });
                }
            }

            var categories = [];
            if (contacts[i].categories != null) {
                for (var j = 0; j < contacts[i].categories.length; j++) {
                    categories.push({ "type": contacts[i].categories[j].type, "value": contacts[i].categories[j].value, "pref": contacts[i].categories[j].pref });
                }
            }

            var photos = [];
            if (contacts[i].photos != null) {
                for (var j = 0; j < contacts[i].photos.length; j++) {
                    var imageURI = contacts[i].photos[j].value;
                    imageURI += "~" + contacts[i].id;
                    window.getphotoasbase64(imageURI, function (echoValue) {

                        // console.log(echoValue);
                        var str_native_result_arr = echoValue.split("~");
                        if (str_native_result_arr.length > 0) {
                            if (str_native_result_arr[0] != "") {
                                Ajax.call({
                                    url: dealinguri + "/synker/grab_contact_pic",
                                    cache: false,
                                    type: 'POST',
                                    async: true,
                                    data: {
                                        b64: str_native_result_arr[0],
                                        c_id: str_native_result_arr[1],
                                        curautocoding: $('#inptsrvuid').val()
                                    },
                                    success: function (data) {
                                        console.log("Photo uploaded");
                                    },
                                    error: function (error) {
                                        //$('#dvinnercentercontent').html(error.statusText);
                                        //console.log(error.statusText + " " + error.responseText);
                                        //console.log("failed :" + imageURI);
                                        console.log("failure params :" + str_native_result_arr[1]);

                                    },
                                    complete: function () {
                                    }
                                });

                            }
                        }
                    });

                    photos.push({ "type": contacts[i].photos[j].type, "value": contacts[i].photos[j].value, "pref": contacts[i].photos[j].pref });
                }
            }

            var contact_record = {
                "id": contacts[i].id,
                "displayName": contacts[i].displayName,
                "name": {
                    "formatted": contacts[i].name.formatted,
                    "familyName": contacts[i].name.familyName,
                    "givenName": contacts[i].name.givenName,
                    "middleName": contacts[i].name.middleName,
                    "honorificPrefix": contacts[i].name.honorificPrefix,
                    "honorificSuffix": contacts[i].name.honorificSuffix
                },
                "phoneNumbers": phonenumbers,
                "emails": emails,
                "addresses": addresses,
                "organizations": organizations,
                "ims": ims,
                "note": contacts[i].note,
                "nickname": contacts[i].nickname,
                "urls": urls,
                "birthday": contacts[i].birthday,
                "photos": photos,
                "categories": categories
            };
            //console.log(JSON.stringify(contact_record));
            var isthefinal = "no";
            if (i == contacts.length - 1) {
                isthefinal = "yes";
            }

            sendccnew(contact_record, isthefinal);

        }
    }
}
function sendccnew(bulkc, thelast) {
    Ajax.call({
        url: dealinguri + "/synker/dvinfsendccnew",
        cache: false,
        type: 'GET',
        async: true,
        contentType: 'application/json; charset=utf-8',
        data: {
            devuid: $('#txt_devuid').val(),
            curAutoCoding: $('#inptsrvuid').val(),
            bct: JSON.stringify(bulkc)
        },
        success: function (data) {
            $('#dvinnercentercontent').html('Done');
            if (thelast == "yes") {
                //the synchronizing has done
                $("#dv_contacts_synch_progress").html("<b>Done, Thank you.</b><br>Your contacts are synchronizing with the Arab Caller system. Please allow about one hour for your contacts to become available.");
                // Fade out the message
                $("#dv_contacts_synch_progress").fadeOut(4000, function () {
                    $("#dv_contacts_synch_progress").html("");
                    $("#dv_contacts_synch_progress").show();

                    $('#li_rearch_result').css('display', '');
                    $('#phone_verification').css('display', 'none');
                    $('#profile_settings').css('display', 'none');
                    $('#li_synch_my_contacts').css('display', 'none');
                    $('#li_list_of_pre_words').css('display', 'none');

                });
            }
        },
        error: function (error) {
            //$('#dvinnercentercontent').html(error.statusText);
            console.log(error.statusText + " " + error.responseText);
        },
        complete: function () {
        }
    });
}
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image file location url string
    navigator.camera.getPicture(onPhotoDataSuccess, onPhotoFail, {
        quality: 50, allowEdit: true,
        destinationType: Camera.DestinationType.FILE_URI
        //destinationType: destinationType.DATA_URL

    });
}
function onPhotoDataSuccess(imageURI) {
    // Uncomment to view the base64 encoded image data
    // console.log(imageData);

    // Get image handle
    //

    $('#imgprofile').css('display', '');
    $('#ImgInfo_container').css('background', '');

    var smallImage = document.getElementById('imgprofile');

    // Unhide image elements
    //
    smallImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    //smallImage.src = "data:image/jpeg;base64," + imageData;
    smallImage.src = imageURI;
}
function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);

    // Get image handle
    //
    $('#imgprofile').css('display', '');
    $('#ImgInfo_container').css('background', '');

    var largeImage = document.getElementById('imgprofile');

    // Unhide image elements
    //
    largeImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
}
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onPhotoFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}
function onPhotoFail(message) {
    alert('Failed because: ' + message);
}

if (typeof String.prototype.startsWith != 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) == 0;
    };
}



function loguserrefuseterms() {
    Ajax.call({
        url: dealinguri + "/rc20/loguserrefuseterms",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            curAutoCoding: $('#inptsrvuid').val(),
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            platform: $("#txt_platform").val()
        },
        success: function (data) {
            navigator.app.exitApp();
        },
        error: function (error) {
            console.log(error.statusText + " " + error.responseText);

        },
        complete: function () {
        }
    });

}

function startup() {
    Ajax.call({
        url: dealinguri + "/rc20/startup_new",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            curAutoCoding: $('#inptsrvuid').val(),
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            platform: $("#txt_platform").val(),
            lang: $("#txt_local_language").val()
        },
        success: function (data) {
            $('#dv_dynamic_server_startup').html(data);
        },
        error: function (error) {
        },
        complete: function () {
        }
    });

}

function send_push_params(chid) {
    Ajax.call({
        url: dealinguri + "/pusher/process_p",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $("#txt_app_name").val(),
            platform: $("#txt_platform").val(),
            chid_pam: chid
        },
        success: function (data) {
            if (data != "") {
                $('#dv_dynamic_server_garb').html(data);
            }
        },
        error: function (error) {

        },
        complete: function () {

        }
    });

}




$('#btnsaveprofile').bind('touchend', function () {

    if ($('#fullname').val() == "") {
        var test = 'Please enter your fullname';
        $('#required').html(test);
        $('#required').show();
        $('#fullname').css('border', '1px solid #CF3434');
        $('#phonenbr').css('border', '1px solid #ccc');
        $('#email').css('border', '1px solid #ccc');
    }

    else if ($('#email').val() == "") {
        var test = 'Please enter your email address';
        $('#required').html(test);
        $('#required').show();
        $('#email').css('border', '1px solid #CF3434');
        $('#phonenbr').css('border', '1px solid #ccc');
        $('#fullname').css('border', '1px solid #ccc');

    }
    else {

        $('#required').hide();
        show_loading();

        Ajax.call({
            url: dealinguri + "/rc20/edituser",
            cache: false,
            type: 'GET',
            async: true,
            data: {
                devuid: $('#txt_devuid').val(),
                nickname: $('#fullname').val(),
                pnbr: $('#phonenbr').val(),
                email: $('#email').val(),
                adr: $('#address').val(),
                AutoCoding: $('#inptsrvuid').val()
            },
            success: function (data) {
                $('#dv_profile_progress_status').html("");
                hide_loading();

                var str_thankyou = 'Thank You.';

                if ($('#fullname').val() != "") {
                    $('#spnofname_f_chars_left').html($('#fullname').val());
                }

                send_to_native();

                $('#required').html(str_thankyou).show('fast').delay(1000).fadeOut(500, function () {
                    hide_all_layers();
                    show_a_layer("li_home_page");
                });

            },
            error: function (error) {
                hide_loading();
                $('#dv_profile_progress_status').html("<div class='innerscroller_error'>Sorry: cannot process your request now, try again.</div>");
                // show_a_layer('li_search_page');
                myScroll.refresh();
            },
            complete: function () {
            }
        });

    }
});



function buildAndValidatePhone(phoneNumber, countryCode) {
    var strIntlNumber = "invalid";

    try {
        var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
        var regionCode = phoneUtil.getRegionCodeForCountryCode(countryCode);
        var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);

        if (phoneUtil.isValidNumber(number)) {
            var PNT = i18n.phonenumbers.PhoneNumberType;
            var numberType = phoneUtil.getNumberType(number);

            if (numberType == PNT.MOBILE) {
                var PNF = i18n.phonenumbers.PhoneNumberFormat;
                strIntlNumber = phoneUtil.format(number, PNF.E164);
                strIntlNumber = strIntlNumber.replace('+', '');
            }
        }
    }
    catch (ex) {
        console.log(ex);
    }

    return strIntlNumber;
};

function getpointscenter_quick() {

    Ajax.call({
        url: dealinguri + "/rc20/n_pointscenter",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_app_version').val(),
            AppName: $("#txt_app_name").val(),
            platform: $("#txt_platform").val(),
            usuid: $("#inptsrvuid").val()
        },
        success: function (data) {
            if (data != "") {
                $('#spnofrealbal').html(data);
                $('#spnofrealbal_left').html(data);
            }
        },
        error: function (error) {

        },
        complete: function () {

        }
    });

}
function add_adcolony_v4vc_coins() {

    Ajax.call({
        url: dealinguri + "/balmanager/add_vungle_coins",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_app_version').val(),
            AppName: $("#txt_app_name").val(),
            platform: $("#txt_platform").val(),
            usuid: $("#inptsrvuid").val()
        },
        success: function (data) {
            if (data != "") {
                getpointscenter_quick();
                $('#maincoinssystem').hide('slidedown');
            }
        },
        error: function (error) {

        },
        complete: function () {

        }
    });

}


$('#btn_remove_ads_from_app_modal_submit_button').bind('click', function (event) {

    $('#remove_ads_from_app_modal').closeModal();


    Ajax.call({
        url: dealinguri + "/rc20/decrement_a_remove_ads_coins",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_app_version').val(),
            AppName: $("#txt_app_name").val(),
            platform: $("#txt_platform").val(),
            usuid: $("#inptsrvuid").val()
        },
        success: function (data) {
            getpointscenter_quick();
            try {
                AndroidFunction.remove_ads();
            }
            catch (ex) {
                console.log(ex);
            }
            var time = new Date();
            time.setDate(time.getDate() + 30);

            $('#generic_modal_text').html('Congrats, Arab Caller is ads free till ' + time + '.<br>Just close and open the application.');
            $('#generic_modal').openModal();

        },
        error: function (error) {

        },
        complete: function () {

        }
    });

});

function close_main_get_coins_system_layer() {

    $('#maincoinssystem').hide('slidedown');



    event.stopPropagation();
    event.preventDefault();
}


function set_in_app_locale_price(lprice) {
    $('#spn_local_in_app_price').html(lprice);

}

function set_in_app_subscription_item_locale_price(lprice)
{
    $('#spn_local_subscription_price').html(lprice);
}

function set_synch_progress_message() {

    $('#spn_synch_notification').html('The synch operartion is in progress, please allow us a few minutes and try to use this feature.<br/>We will notify you by Notification if we need more time.<br/> Thank you.');
}

function setselectednativecountry(cciso) {
    $('#cmbcountries').val(cciso);

    var option_c_flag = $('option:selected', $('#cmbcountries')).attr('flg');
    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');
    $('#imgcountryflag').attr('src', option_c_flag);
    $('#spn_selected_country_code').html(option_c_code);
    //$('#spn_selected_country').html('<img src="' + option_c_flag + '" style="width: 24px;" /> ' + option_c_code);
    searfor();
}

function set_n_Location(coord_only, coord) {


    $("#coord").val(coord);

    if (coord_only != null) {
        console.log(coord_only);
        var position = coord_only.split("^")
        $('#txt_lat').val(position[0]);
        $('#txt_lng').val(position[1]);
        $('#txt_Altitude').val(position[2]);
        $('#txt_Accuracy').val(position[3]);

        $('#txt_AltitudeAccuracy').val(position[3]);
        $('#txt_Heading').val(position[4]);
        $('#txt_Speed').val(position[5]);
        $('#txt_Timestamp').val(position[6]);
    }

}


function backpressed() {
    console.log("backpressed");


    var visibles_count = 0;
    $('.modal').each(function (i, obj) {
        var isVisible = $(this).is(':visible');
        var isHidden = $(this).is(':hidden');
        if (isVisible) {
            try
            {
                $(this).modal('hide');
            }
            catch(err){

            }
            try {
                $(this).closeModal();
            }
            catch (err) {

            }
            visibles_count++;
        }

    });

    if (visibles_count == 0) {

        if ($('#li_search_page').is(':visible')) {
            hide_all_layers();
            show_a_layer("li_home_page");
            visibles_count++;
        }

        if ($('#li_views_page').is(':visible')) {
            hide_all_layers();
            show_a_layer("li_home_page");
            visibles_count++;
        }

        if ($('#li_history_page').is(':visible')) {
            hide_all_layers();
            show_a_layer("li_home_page");
            visibles_count++;
        }


        if ($('#li_listing_page').is(':visible')) {
            hide_all_layers();
            show_a_layer("li_home_page");
            visibles_count++;
        }

        if ($('#li_nearby_page').is(':visible')) {
            hide_all_layers();
            show_a_layer("li_home_page");
            visibles_count++;
        }

        if ($('#li_profile_page').is(':visible')) {
            hide_all_layers();
            show_a_layer("li_home_page");
            visibles_count++;
        }
    }
    if (visibles_count == 0) {
        AndroidFunction.repressback("");
    }

}

function hide_all_layers() {
    $('#li_home_page').css('display', 'none');
    $('#li_search_page').css('display', 'none');
    $('#li_views_page').css('display', 'none');
    $('#li_history_page').css('display', 'none');
    $('#li_listing_page').css('display', 'none');
    $('#li_nearby_page').css('display', 'none');
    $('#li_profile_page').css('display', 'none');
    $('#btn_floating_of_all').css('display', 'none');
}

function show_a_layer(lay_id) {
    $('#' + lay_id).css('display', '');
}




function setprofilepic(b64) {
    if (b64 != "") {
        var url = "data:image/png;base64," + b64;
        $('#left_side_menu_profile_pic').attr('src', url);
        var img = new Image();
        img.src = url;
        $('#dv_my_profile_profile_pic_thumb').css("background-image", "url('" + img.src + "')");
    }
}

function set_as_pro_member()
{
    Ajax.call({
              url: dealinguri + "/balmanager/set_as_arab_pro_member",
              cache: false,
              type: 'GET',
              async: true,
              data: {
              devuid: $('#txt_devuid').val(),
              vers: $('#txt_app_version').val(),
              AppName: $("#txt_app_name").val(),
              platform: $("#txt_platform").val(),
              usuid: $("#inptsrvuid").val(),
              lang: $("#txt_local_language").val()
              },
              success: function (data) {

                   $('#txt_user_level').val("pro");
                   $("#img_pro_sign").css('display','');
                   AndroidFunction.set_as_pro_member("");

              },
              error: function (error) {

              },
              complete: function () {

              }
              });
}