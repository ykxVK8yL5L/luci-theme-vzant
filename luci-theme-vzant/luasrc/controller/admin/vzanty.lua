module("luci.controller.admin.vzanty", package.seeall)

function index()
    

    if not nixio.fs.access("/etc/config/vzant") then return end
	if nixio.fs.access("/etc/config/vzant_show") then
		entry({"admin", "status"}, alias("admin", "status", "vzant"), _("Status"), 0).index = true
		entry({"admin", "status", "vzant"}, template("themes/vzant/vzant"), _("Vzant"), 0)
	else
		entry({"admin", "status"}, alias("admin", "status", "overview"), _("Status"), 20).index = true
		entry({"admin", "status", "vzant"}, template("themes/vzant/vzant"), _("Vzant"), 60)
	end
	entry({"admin", "status", "vzant", "show"}, call("show_menu")).leaf = true
	entry({"admin", "status", "vzant", "hide"}, call("hide_menu")).leaf = true

    entry({'admin', 'status', 'vzant', 'addfavourite'}, call('addfavourite'))
    entry({'admin', 'status', 'vzant', 'delfavourite'}, call('delfavourite'))
    entry({'admin', 'status', 'vzant', 'getfavourites'}, call('getfavourites'))
end



function show_menu()
	luci.sys.call("touch /etc/config/vzant_show")
	luci.http.redirect(luci.dispatcher.build_url("admin", "status", "vzant"))
end

function hide_menu()
	luci.sys.call("rm -rf /etc/config/vzant_show")
	luci.http.redirect(luci.dispatcher.build_url("admin", "status", "overview"))
end



function addfavourite()
  local title = string.gsub(luci.http.formvalue("title"), "%s+", "")
  local src = luci.http.formvalue("src")
  local name = os.time()
  --local uci = luci.model.uci.cursor()
  --uci:set('vzant', '@favourite.'..name, 'title', title)
  local executeString = "uci set vzant."..name.."=favourite"
  luci.sys.exec(executeString)

  local titleString = "uci set vzant."..name..".title="..title
  luci.sys.exec(titleString)

  local srcString = "uci set vzant."..name..".src="..src
  luci.sys.exec(srcString)



  luci.sys.exec("uci commit vzant");
  local o = {}
  o['data'] = "ok"
  o['msg'] = name
  luci.http.prepare_content("application/json")
  luci.http.write_json(o)
end

function getfavourites()
    local uci = luci.model.uci.cursor()
    local favourite_table = {}
    uci:foreach(
        'vzant',
        'favourite',
        function(s)
            local e = {}
            e['name'] = s['.name']
            e['title'] = s.title
            e['src'] = s.src
            table.insert(favourite_table, e)
        end
    )
    luci.http.prepare_content('application/json')
    luci.http.write_json(favourite_table)
end




function delfavourite()
  local name = luci.http.formvalue("name")
  local executeString = "uci delete vzant."..name
  luci.sys.exec(executeString)
  luci.sys.exec("uci commit vzant");
  local o = {}
  o['data'] = "ok"
  luci.http.prepare_content("application/json")
  luci.http.write_json(o)
end

