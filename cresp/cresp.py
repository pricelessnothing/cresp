"""
Trying to open react in xblock
"""

import pkg_resources
import base64
import json
from web_fragments.fragment import Fragment
from xblock.core import XBlock
from xblock.fields import String, Integer, Scope

class CrespXBlock(XBlock):

    default_json = '[{"feature":"Feauture","taxonomy":"Taxonomy","contentType":"text","contentValue":"Card text"}]'

    input_data = String(help="no help provided",
        default=base64.b64encode(default_json.encode('ascii')),
        scope=Scope.settings)

    card_width = Integer(help="card width", scope=Scope.settings, default=150)
    card_height = Integer(help="card height", scope=Scope.settings, default=70)

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the CrespXBlock, shown to students
        when viewing courses.
        """

        # json = '[{"feature":"Image","taxonomy":"Raster Graphics","contentType":"image","contentValue":"https://pp.userapi.com/c7002/v7002193/1663a/NNA2GkyAUMI.jpg"},{"feature":"Consists of...","taxonomy":"Raster Graphics","contentType":"text","contentValue":"pixels"},{"feature":"Scaling","taxonomy":"Raster Graphics","contentType":"text","contentValue":"distortion"},{"feature":"Types of files","taxonomy":"Raster Graphics","contentType":"text","contentValue":"bmp, jpg, tif, gif, psd"},{"feature":"Image","taxonomy":"Vector Graphics","contentType":"image","contentValue":"https://sun9-43.userapi.com/c630329/v630329953/18258/2tTMWLPa7t0.jpg"},{"feature":"Consists of...","taxonomy":"Vector Graphics","contentType":"text","contentValue":"geometric objects"},{"feature":"Scaling","taxonomy":"Vector Graphics","contentType":"text","contentValue":"without quality loss"},{"feature":"Types of files","taxonomy":"Vector Graphics","contentType":"text","contentValue":"svg, cdr, ai"}]'

        # self.input_data = base64.b64encode(self.the_data.encode('ascii'))
        html = self.resource_string("static/html/student_view.html")
        frag = Fragment(html.format(self=self))

        frag.add_javascript(self.resource_string("static/js/src/student_view.js"))
        frag.add_javascript(self.resource_string("static/js/src/student_view_ignition.js"))

        frag.initialize_js('CrespXBlock')
        return frag

    # TO-DO: change this view to display your data your own way.
    def studio_view(self, context=None):

        # self.input_data = base64.b64encode(self.the_data.encode('ascii'))

        html = self.resource_string("static/html/studio_view.html")
        frag = Fragment(html.format(self=self))

        frag.add_javascript(self.resource_string("static/js/src/studio_view.js"))
        frag.add_javascript(self.resource_string("static/js/src/studio_view_ignition.js"))

        frag.initialize_js('CrespXBlockSetup')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def save_data(self, data, suffix=''):
        self.input_data = base64.b64encode(json.dumps(data[0]).encode('ascii'))
        self.card_width = data[1]
        self.card_height = data[2]
        return data

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("CrespXBlock",
             """<cresp/>
             """),
            ("Multiple CrespXBlock",
             """<vertical_demo>
                <cresp/>
                <cresp/>
                <cresp/>
                </vertical_demo>
             """),
        ]
